import { PrismaService } from "src/prisma/prisma.service";
import { PostsService } from "../posts.service";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PayloadDto } from "src/auth/dto/payload.dto";
import * as cuid2 from "@paralleldrive/cuid2";
import { CreatePostDto } from "../dto/create-posts.dto";


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

const postDto: CreatePostDto = {
  title: "First Post",
  introduction: "This is the introduction",
  story: "This is the story",
  conclusion: "This is the conclusion",
}

const updateMockPost = {
  id: "mock-id",
  title: "First Post",
  introduction: "This is the introduction",
  story: "This is the story",
  conclusion: "This is the conclusion",
  created_at: new Date(),
  updated_at: new Date(),
  userId: payloadToken.sub
}

const mockPostsList = [mockPost]

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
              update: jest.fn(),
              delete: jest.fn(),
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
      const result = await postsService.createOne(postDto, payloadToken)

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

    it("should a error to create post", async () => {
      jest.spyOn(cuid2, 'createId').mockReturnValue('mocked-new-post-id');
      jest.spyOn(prismaService.posts, "create").mockRejectedValue(new Error("Database Error"))

      await expect(postsService.createOne(postDto, payloadToken)).rejects.toThrow(
        new HttpException("Error creating post", HttpStatus.BAD_REQUEST)
      )

      expect(prismaService.posts.create).toHaveBeenCalledWith({
        data: {
          id: "mocked-new-post-id",
          title: postDto.title,
          introduction: postDto.introduction,
          story: postDto.story,
          conclusion: postDto.conclusion,
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
    })  

    it("should throw an INTERNAL_SERVER_ERROR exception when an unexpected error occurs during user creation", async () => {
      jest.spyOn(cuid2, 'createId').mockReturnValue('mocked-new-post-id');
      jest.spyOn(prismaService.posts, "create").mockRejectedValue(new Error("Database Error"))

      await expect(postsService.createOne(postDto, payloadToken)).rejects.toThrow(
        new HttpException("Error creating post", HttpStatus.INTERNAL_SERVER_ERROR)
      )

      expect(prismaService.posts.create).toHaveBeenCalledWith({
        data: {
          id: "mocked-new-post-id",
          title: postDto.title,
          introduction: postDto.introduction,
          story: postDto.story,
          conclusion: postDto.conclusion,
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
    })
  })

  describe("Update Post", () => {
    it("should be successfully update a post", async () => {
      const updatePost = {
        id: "mock-new-id",
        title: "First Post",
        introduction: "This is the introduction",
        story: "This is the story",
        conclusion: "This is the conclusion",
        created_at: new Date(),
        updated_at: new Date(),
        userId: payloadToken.sub
      };

      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(updateMockPost);
      jest.spyOn(prismaService.posts, "update").mockResolvedValue(updatePost);

      const result = await postsService.updateOne(mockPost.id, postDto, payloadToken);

      expect(prismaService.posts.update).toHaveBeenCalledWith({
        where: {
          id: mockPost.id,
        },
        data: {
          ...postDto,
          updated_at: expect.any(Date),
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
              id: true,
              name: true,
              email: true,
              created_at: true,
            },
          },
          Comments: {
            select: {
              id: true,
              comment: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  created_at: true,
                },
              },
            },
          },
        },
      });

      expect(result).toEqual(updatePost);
    });

    it("should throw an INTERNAL_SERVER_ERROR exception when a database error occurs during update", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockRejectedValue(new Error("Database Error"))

      await expect(postsService.updateOne(mockPost.id, postDto, payloadToken)).rejects.toThrow(
        new HttpException("Error updating post", HttpStatus.INTERNAL_SERVER_ERROR)
      )
    })

    it("should throw a NOT_FOUND exception when the post to update is not found", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(null)

      await expect(postsService.updateOne(mockPost.id, postDto, payloadToken)).rejects.toThrow(
        new HttpException("Error updating post", HttpStatus.NOT_FOUND)
      )
    })

    it("should throw a BAD_REQUEST exception when the user is not authorized to update", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(updateMockPost)

      await expect(postsService.updateOne(mockPost.id, postDto, payloadTokenReject)).rejects.toThrow(
        new HttpException("Error updating post", HttpStatus.BAD_REQUEST)
      )
    })
  })

  describe("Delete Post", () => {
    it("should be successfully delete a post", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(updateMockPost)
      jest.spyOn(prismaService.posts, "delete").mockResolvedValue(mockPost)

      const result = await postsService.deleteOne(mockPost.id, payloadToken)

      expect(prismaService.posts.delete).toHaveBeenCalledWith({
        where: {
          id: mockPost.id,
        },
      })

      expect(result).toEqual({ message: "Post deleted successfully" })
    })

    it("should thorw exception when posts is not found", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(null)

      await expect(postsService.deleteOne(mockPost.id, payloadToken)).rejects.toThrow(
        new HttpException('Error deleting post', HttpStatus.BAD_REQUEST)
      )
    })

    it("should throw UNAUTHORIZED exception when post is not authorized", async () => {
      jest.spyOn(prismaService.posts, "findFirst").mockResolvedValue(updateMockPost)

      await expect(postsService.deleteOne(mockPost.id, payloadTokenReject)).rejects.toThrow(
        new HttpException("Error deleting post", HttpStatus.NOT_FOUND)
      )
    })
  })
})