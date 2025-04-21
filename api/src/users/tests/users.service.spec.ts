import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "../users.service"
import { HashingServiceProtocol } from "src/auth/hash/hashing.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PayloadDto } from "src/auth/dto/payload.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

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
              findFirst: jest.fn()
            }
          }
        },
        {
          provide: HashingServiceProtocol,
          useValue: {}
        }
      ]
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol)
  })

  it("should be define users service", () => {
    expect(UsersService).toBeDefined()
  })

  describe("Find One User", () => {
    it("should return a user found", async () => {
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

    it("should throw erro exception when user is not found", async () => {
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

    it('deve lançar 500 se ocorrer erro inesperado', async () => {
      jest.spyOn(prismaService.users, 'findFirst').mockRejectedValue(new Error('DB down'));
      
      await expect(usersService.findOne(payloadToken)).rejects.toThrow(
        new HttpException("Failed to find user", HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  })
})