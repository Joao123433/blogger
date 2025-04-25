import { HashingServiceProtocol } from "src/auth/hash/hashing.service";
import { PrismaService } from "src/prisma/prisma.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { UsersService } from "../users.service"
import * as cuid2 from "@paralleldrive/cuid2";

import { BusboyFileStream } from "@fastify/busboy";
import { Multipart } from "@fastify/multipart";
import * as path from "node:path"
import * as fs from "node:fs"

jest.mock("node:fs")

const payloadToken: PayloadDto = {
  sub: "mocked-id",
  email: "test@test.com",
  iat: 123,
  exp: 123,
  aud: "",
  iss: "",
}

const payloadTokenReject = {
  ...payloadToken,
  sub: "asdf"
}

const mockUser = {
  id: "mocked-id",
  name: "Test",
  passwordHash: "HASH_MOCK_EXEMPLO",
  email: "test@test.com",
  avatar: null,
  created_at: new Date(),
  updated_at: new Date(),
  Posts: [],
  Comments: []
}

const file: Multipart = {
  filename: "mocked-id.png",
  mimetype: 'image/png',
  file: (async function* () { 
    yield Buffer.from('chunk1'); 
    yield Buffer.from('chunk2'); 
  })() as unknown as BusboyFileStream,
  type: 'file',
  toBuffer: async () => Buffer.concat([Buffer.from('chunk1'), Buffer.from('chunk2')]),
  fieldname: 'file',
  encoding: '7bit',
  fields: {}
};

describe("User Service", () => {
  let usersService: UsersService;
  let prismaService: PrismaService;
  let hashingService: HashingServiceProtocol;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findFirst: jest.fn(),
              create: jest.fn().mockResolvedValue({
                id: "mocked-id",
                name: "Test",
                email: "test@test.com"
              }),
              update: jest.fn(),
              delete: jest.fn()
            }
          }
        },
        {
          provide: HashingServiceProtocol,
          useValue: {
            hash: jest.fn()
          }
        }
      ]
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol)
  })

  it("should define users service", () => {
    expect(UsersService).toBeDefined()
  })

  describe("Find One User", () => {
    it("should return the user details when a user is found", async () => {
      // FIRST A
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)

      // SECOND A
      const result = await usersService.findOne(payloadToken)

      // THIRD A
      expect(prismaService.users.findFirst).toHaveBeenCalledWith({
        where:{
          id: payloadToken.sub
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
          avatar: true,
          Posts: {
            select: {
              id: true,
              title: true,
              introduction: true,
              created_at: true
            }
          },
          Comments: {
            select: {
              id: true,
              comment: true,
              created_at: true
            }
          }
        }
      })

      expect(result).toEqual(mockUser)
    });

    it("should throw a NOT_FOUND exception when the user does not exist", async () => {
      // FIRST A
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(null)

      // SECOND A
      await expect(usersService.findOne(payloadToken)).rejects.toThrow(
        new HttpException("Failed to find user", HttpStatus.NOT_FOUND)
      )
      
      // THIRD A
      expect(prismaService.users.findFirst).toHaveBeenCalledWith({
        where:{
          id: payloadToken.sub
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
          avatar: true,
          Posts: {
            select: {
              id: true,
              title: true,
              introduction: true,
              created_at: true
            }
          },
          Comments: {
            select: {
              id: true,
              comment: true,
              created_at: true
            }
          }
        }
      })
    }); 

    it("should throw an INTERNAL_SERVER_ERROR exception when a database error occurs", async () => {
      jest.spyOn(prismaService.users, 'findFirst').mockRejectedValue(new Error('DB down'));
      
      await expect(usersService.findOne(payloadToken)).rejects.toThrow(
        new HttpException("Failed to find user", HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  })

  describe("Create User", () => {
    const userDto = {
      name: "Test",
      passwordHash: "12345678",
      email: "test@test.com"
    }

    it("should successfully create and return a new user", async () => {
      // FIRST A
      jest.spyOn(cuid2, 'createId').mockReturnValue('mocked-id');
      jest.spyOn(hashingService, "hash").mockResolvedValue("HASH_MOCK_EXEMPLO")

      // SECOND A
      const result = await usersService.createOne(userDto)

      // THIRD A
      expect(hashingService.hash).toHaveBeenCalledWith(userDto.passwordHash)

      expect(prismaService.users.create).toHaveBeenCalledWith({
        data: {
          id: 'mocked-id', 
          name: userDto.name,
          email: userDto.email,
          passwordHash: "HASH_MOCK_EXEMPLO"
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })

      expect(result).toEqual({
        id: "mocked-id",
        name: userDto.name,
        email: userDto.email,
      })
    })

    it("should throw a BAD_REQUEST exception when user creation fails due to a database error", async () => {
      // FIRST A
      jest.spyOn(cuid2, 'createId').mockReturnValue('mocked-id');
      jest.spyOn(hashingService, "hash").mockResolvedValue("HASH_MOCK_EXEMPLO")
      jest.spyOn(prismaService.users, "create").mockRejectedValue(new Error("Database Error"))

      // SECOND A
      await expect(usersService.createOne(userDto)  ).rejects.toThrow(
        new HttpException("Failed to create user", HttpStatus.BAD_REQUEST)
      )

      // THIRD A
      expect(hashingService.hash).toHaveBeenCalledWith(userDto.passwordHash)

      expect(prismaService.users.create).toHaveBeenCalledWith({
        data: {
          id: 'mocked-id', 
          name: userDto.name,
          email: userDto.email,
          passwordHash: "HASH_MOCK_EXEMPLO"
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })
    })

    it("should throw an INTERNAL_SERVER_ERROR exception when an unexpected error occurs during user creation", async () => {
      // FIRST A
      jest.spyOn(cuid2, 'createId').mockReturnValue('mocked-id');
      jest.spyOn(hashingService, "hash").mockResolvedValue("HASH_MOCK_EXEMPLO")
      jest.spyOn(prismaService.users, "create").mockRejectedValue(new Error("Database Error"))

      // SECOND A
      await expect(usersService.createOne(userDto)).rejects.toThrow(
        new HttpException("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR)
      )

      // THIRD A
      expect(hashingService.hash).toHaveBeenCalledWith(userDto.passwordHash)

      expect(prismaService.users.create).toHaveBeenCalledWith({
        data: {
          id: 'mocked-id', 
          name: userDto.name,
          email: userDto.email,
          passwordHash: "HASH_MOCK_EXEMPLO"
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })
    })
  })

  describe("Update User", () => {
    const userDto = {
      name: "Test",
      passwordHash: "12345678",
    }

    it("should successfully update and return the updated user details", async () => {
      // FIRST A
      const updateUser = {
        id: "mocked-id",
        name: "test 2",
        email: "test2@test.com",
        passwordHash: "HASH_MOCK_EXEMPLO_NOVO",
        avatar: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      // SECOND A
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)
      jest.spyOn(hashingService, "hash").mockResolvedValue("HASH_MOCK_EXEMPLO_NOVO")
      jest.spyOn(prismaService.users, "update").mockResolvedValue(updateUser)

      const result = await usersService.updateOne(mockUser.id, userDto, payloadToken)

      // THIRD A
      expect(hashingService.hash).toHaveBeenCalledWith(userDto.passwordHash)

      expect(prismaService.users.update).toHaveBeenCalledWith({
        where: {
          id: mockUser.id
        },
        data: {
          name: userDto.name,
          passwordHash: updateUser.passwordHash,
          updated_at: expect.any(Date) 
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      })

      expect(result).toEqual(updateUser)
    })

    it("should throw an INTERNAL_SERVER_ERROR exception when a database error occurs during update", async () => {
      jest.spyOn(prismaService.users, "findFirst").mockRejectedValue(new Error("Database Error"))

      await expect(usersService.updateOne(mockUser.id, UpdateUserDto, payloadToken)).rejects.toThrow(
        new HttpException("Error updating user", HttpStatus.INTERNAL_SERVER_ERROR)
      )
    })

    it("should throw a NOT_FOUND exception when the user to update is not found", async () => {
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(null)

      await expect(usersService.updateOne(mockUser.id, userDto, payloadToken)).rejects.toThrow(
        new HttpException("Error updating user", HttpStatus.NOT_FOUND)
      )
    })

    it("should throw a BAD_REQUEST exception when the user is not authorized to update", async () => {
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)

      await expect(usersService.updateOne(mockUser.id, UpdateUserDto, payloadTokenReject)).rejects.toThrow(
        new HttpException("Error updating user", HttpStatus.BAD_REQUEST)
      )
    })
  })

  describe("Delete User", () => {
    it("should be delete user", async () => {
      // SECOND A
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)
      jest.spyOn(prismaService.users, "delete").mockResolvedValue(mockUser)

      const result = await usersService.deleteOne(mockUser.id, payloadToken)

      // THIRD A
      expect(prismaService.users.delete).toHaveBeenCalledWith({
        where: {
          id: mockUser.id
        }  
      })

      expect(result).toEqual({
        message: "User deleted successfully"
      })
    })

    it("should thorw exception when user is not found", async () => {
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(null)

      await expect(usersService.deleteOne(mockUser.id, payloadToken)).rejects.toThrow(
        new HttpException("Error deleting user", HttpStatus.BAD_REQUEST)
      )
    })

    it("should throw UNAUTHORIZED exception when user is not authorized", async () => {
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)

      await expect(usersService.deleteOne(mockUser.id, payloadTokenReject)).rejects.toThrow(
        new HttpException("Error deleting user", HttpStatus.BAD_REQUEST)
      )
    })
  })

  describe("Update user avatar", () => {
    it("should upload avatar and update user successfully", async () => {
      const updatedUser = {
        id: "mocked-id",
        name: "Test",
        email: "test@test.com",
        passwordHash: "HASH_MOCK_EXEMPLO",
        avatar: `mocked-id.png`,
        created_at: new Date(),
        updated_at: new Date(),
      }

      const mockReq = { file: async () => file };

      const fileExtension = path.extname(file.filename).toLowerCase().substring(1);
      const filePathBase = path.resolve(process.cwd(), 'files', "mocked-id.png");
      const fileName = `${payloadToken.sub}.${fileExtension}`;
      const fileLocale = path.resolve(process.cwd(), 'files', fileName);

      jest.spyOn(fs, "existsSync").mockImplementation((filePath) => {
        return String(filePath).endsWith(".png");
      });
      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(mockUser)
      jest.spyOn(prismaService.users, "update").mockResolvedValue(updatedUser)
      jest.spyOn(fs, "writeFileSync").mockReturnValue()

      const result = await usersService.uploadFile(mockReq as any, payloadToken)

      expect(fs.existsSync).toHaveBeenCalledWith(filePathBase);
      expect(fs.unlinkSync).toHaveBeenCalledWith(filePathBase);

      expect(fs.writeFileSync).toHaveBeenCalledWith(fileLocale, await file.toBuffer())

      expect(result).toEqual({
        id: 'mocked-id',
        name: 'Test',
        email: 'test@test.com',
        passwordHash: 'HASH_MOCK_EXEMPLO',
        avatar: 'mocked-id.png',
        created_at: expect.any(Date),
        updated_at: expect.any(Date) 
      });

      expect(prismaService.users.update).toHaveBeenCalledWith({
        data: {
          avatar: updatedUser.avatar
        },
        where: {
          id: mockUser.id
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        }
      })

      expect(result).toEqual(updatedUser)
    })

    it("should throw erro if no file", async () => {
      const file = {
        filename: "",
        mimetype: "",
        file: []
      }

      const mockReq = { file: async () => file };

      await expect(usersService.uploadFile(mockReq as any, payloadToken)).rejects.toThrow(
        new HttpException("No file provided", HttpStatus.NOT_FOUND)
      )
    })

    it("should throw NOT_FOUND when user is not found", async () => {
      const mockReq = { file: async () => file };

      jest.spyOn(prismaService.users, "findFirst").mockResolvedValue(null)

      await expect(usersService.uploadFile(mockReq as any, payloadToken)).rejects.toThrow(
        new HttpException("User not found", HttpStatus.NOT_FOUND)
      )
    })
  })
  //   it('retorna buffer válido se tipo e tamanho estiverem corretos', async () => {
  //     const fakeFile: Multipart = {
  //       filename: "mocked-id.png",
  //       mimetype: 'image/png',
  //       file: (async function* () { 
  //         yield Buffer.from('chunk1'); 
  //         yield Buffer.from('chunk2'); 
  //       })() as unknown as BusboyFileStream,
  //       type: 'file',
  //       toBuffer: async () => Buffer.concat([Buffer.from('chunk1'), Buffer.from('chunk2')]),
  //       fieldname: 'file',
  //       encoding: '7bit',
  //       fields: {}
  //     };

  //     const result = await usersService.validateBuffer(fakeFile);
  //     console.log(result)
  //     // expect(result.toString()).toBe('chunk1chunk2');
  //   });
  
  //   // it('lança erro se tipo de arquivo for inválido', async () => {
  //   //   const fakeFile = { mimetype: 'text/plain', file: [] };
  //   //   await expect(usersService.validateBuffer(fakeFile as any))
  //   //     .rejects.toThrow('File type not allowed');
  //   // });
  
  //   // it('lança erro se arquivo ultrapassar 1MB', async () => {
  //   //   const bigChunk = Buffer.alloc(1000001);
  //   //   const fakeFile = {
  //   //     mimetype: 'image/png',
  //   //     file: (async function* () { yield bigChunk; })()
  //   //   };
  
  //   //   await expect(usersService.validateBuffer(fakeFile as any)).rejects.toThrow('File exceeds');
  //   // });
  // });
})