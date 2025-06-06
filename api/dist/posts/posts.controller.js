"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logget_interceptor_1 = require("../commom/interceptors/logget.interceptor");
const exception_filter_1 = require("../commom/filters/exception-filter");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const Pagination_dto_1 = require("../commom/dto/Pagination.dto");
const create_posts_dto_1 = require("./dto/create-posts.dto");
const update_post_dto_1 = require("./dto/update-post-dto");
const payload_dto_1 = require("../auth/dto/payload.dto");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    findAllPosts(pagination) {
        return this.postsService.findAll(pagination);
    }
    findPostById(id) {
        return this.postsService.findById(id);
    }
    CreatePost(body, payloadToken) {
        return this.postsService.createOne(body, payloadToken);
    }
    UpdatePost(id, body, payloadToken) {
        return this.postsService.updateOne(id, body, payloadToken);
    }
    DeletePost(id, payloadToken) {
        return this.postsService.deleteOne(id, payloadToken);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Find all posts" }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        example: 10,
        description: "Limit of posts to fetch"
    }),
    (0, swagger_1.ApiQuery)({
        name: "offset",
        required: false,
        example: 0,
        description: "Number of items to skip"
    }),
    openapi.ApiResponse({ status: 200, type: [require("./dto/response.dto").ResponseOtherDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Find a post" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        example: "dtpysooc8k9p2mk6f09rv5ro",
        description: "Post identifier"
    }),
    openapi.ApiResponse({ status: 200, type: require("./dto/response.dto").ResponseOtherDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a post" }),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/response.dto").ResponseCreatePostDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_posts_dto_1.CreatePostDto, payload_dto_1.PayloadDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "CreatePost", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a post" }),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/response.dto").ResponseOtherDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, payload_dto_1.PayloadDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "UpdatePost", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a post" }),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payload_dto_1.PayloadDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "DeletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseInterceptors)(logget_interceptor_1.LoggerInterceptor),
    (0, common_1.UseFilters)(exception_filter_1.ApiExceptionFilter),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map