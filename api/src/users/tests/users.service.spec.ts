import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "../users.service"
import { HashingServiceProtocol } from "src/auth/hash/hashing.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as cuid2 from "@paralleldrive/cuid2";
import { rejects } from "assert";

const payloadToken: PayloadDto = {
  sub: "asdf",
  email: "test@test.com",
  iat: 123,
  exp: 123,
  aud: "",
  iss: "",
}

const mockUser = {
  id: "asdf",
  name: "Test",
  passwordHash: "HASH_MOCK_EXEMPLO",
  email: "test@test.com",
  avatar: null,
  created_at: new Date(),
  updated_at: new Date(),
  Posts: [],
  Comments: []
}

const userDto = {
  name: "Test",
  passwordHash: "12345678",
  email: "test@test.com"
}

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
      await expect(usersService.createOne(userDto)  ).rejects.toThrow(
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
})