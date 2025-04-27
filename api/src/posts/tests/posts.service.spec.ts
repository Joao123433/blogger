import { PrismaService } from "src/prisma/prisma.service";
import { PostsService } from "../posts.service";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PayloadDto } from "src/auth/dto/payload.dto";
import * as cuid2 from "@paralleldrive/cuid2";
import { CreatePostDto } from "../dto/create-posts.dto";

const mockPost = {
  id: "mock-id",
  created_at: new Date(),
  updated_at: new Date(),
  userId: "mock-user-id",
  Comments: [
    {
      id: "mock-comment-id",
      comment: "mock comment",
      user: {
        name: "mock-user-id",
        email: "mock@email.com",
        created_at: new Date(),
      }
    }
  ],
  title: "First Post",
  introduction: "This is the introduction",
  story: "This is the story",
  conclusion: "This is the conclusion",
  user: {
    name: "mock-user-id",
    email: "mock@email.com",
    created_at: new Date(),
  }
};

const mockPostsList = [mockPost]

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

describe("PostsService", () => {
  let postsService: PostsService;
  let prismaService: PrismaService;

  beforeAll(() => {
    jest.clearAllMocks();
  });
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: {
            posts: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
            },
            commments: {
              findMany: jest.fn(),
            }
          },
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService)
  });

  it("shoudld be defined postsService", () => {
    expect(postsService).toBeDefined()
  })

  describe("Find All Posts", () => {
    it("should be findAll posts", async () => {
      const pagination = {
        limit: 6,
        offset: 0,
      }

      jest.spyOn(prismaService.posts, "findMany").mockResolvedValue(mockPostsList)
      const result = await postsService.findAll(pagination)

      expect(prismaService.posts.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          title: true,
          introduction: true,
          story: true,
          conclusion: true,
          created_at: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              created_at: true
            }
          },
          Comments: {
            select: {
              comment: true,
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  created_at: true
                }
              }
            }
          }
        },
        take: pagination.limit,
        skip: pagination.offset,
        orderBy: {
          title: 'asc',
        },
      })

      expect(result).toEqual(mockPostsList)
    })

    it("should be findAll posts with default pagination", async () => {
      const pagination = {
        limit: undefined,
        offset: undefined,
      }

      await expect(postsService.findAll).rejects.toThrow(
        new HttpException("Error retrieving posts", HttpStatus.NOT_FOUND)
      )
    })  
  })

  describe("Find Post By Id", () => {
    it("should be findById posts", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(mockPost)
      const result = await postsService.findById(mockPost.id)

      expect(prismaService.posts.findFirst).toHaveBeenCalledWith({
        select: {
					id: true,
					title: true,
					introduction: true,
					story: true,
					conclusion: true,
					created_at: true,
					user: {
						select: {
							id: true,
							name: true,
							email: true,
							created_at: true
						}
					},
					Comments: {
						select: {
							id: true,
							comment: true,
							user: {
								select: {
									name: true,
									email: true,
									created_at: true
								}
							}
						}
					}
				},
				where: {
					id: mockPost.id,
				},
      })
        
      expect(result).toEqual(mockPost)
    })

    it("should throw a NOT_FOUND exception when the post does not exist", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(null)

      await expect(postsService.findById("non-existing-id")).rejects.toThrow(
        new HttpException("Error retrieving post", HttpStatus.NOT_FOUND)
      )
    })
  })

  describe("Create Post", () => {
    it("should be successfully create a post", async () => {
      const createPostDto: CreatePostDto = {
        title: "First Post",
        introduction: "This is the introduction",
        story: "This is the story",
        conclusion: "This is the conclusion",
      }
      
      const newPost = {
        id: "mock-new-id",
        title: "First Post",
        introduction: "This is the introduction",
        story: "This is the story",
        conclusion: "This is the conclusion",
        created_at: new Date(),
        updated_at: new Date(),
        userId: payloadToken.sub
      }

      jest.spyOn(prismaService.posts, "create").mockResolvedValue(newPost)
      jest.spyOn(cuid2, 'createId').mockReturnValue('mock-new-id');
      const result = await postsService.createOne(createPostDto, payloadToken)

      expect(prismaService.posts.create).toHaveBeenCalledWith({
        data: {
          id: result.id,
          title: newPost.title,
          introduction: newPost.introduction,
          story: newPost.story,
          conclusion: newPost.conclusion,
          userId: payloadToken.sub
        },
        select: {
          id: true,
          title: true,
          introduction: true,
          story: true,
          conclusion: true,
          created_at: true,
          user: {
            select: {
              name: true,
              email: true,
              created_at: true
            }
          }
        }
      })

      expect(result).toEqual(newPost)
    })
  })
})