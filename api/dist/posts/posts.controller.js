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
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const Pagination_dto_1 = require("../commom/dto/Pagination.dto");
const create_posts_dto_1 = require("./dto/create-posts.dto");
const update_post_dto_1 = require("./dto/update-post-dto");
const logget_interceptor_1 = require("../commom/interceptors/logget.interceptor");
const exception_filter_1 = require("../commom/filters/exception-filter");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const auth_constants_1 = require("../auth/commom/auth.constants");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    findAllPosts(pagination, req) {
        console.log(req[auth_constants_1.AUTH_TOKEN_PAYLOAD]);
        return this.postsService.findAll(pagination);
    }
    findPostById(id) {
        return this.postsService.findById(id);
    }
    CreatePost(body) {
        return this.postsService.createOne(body);
    }
    UpdatePost(id, body) {
        return this.postsService.updateOne(id, body);
    }
    DeletePost(id) {
        return this.postsService.deleteOne(id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findPostById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_posts_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "CreatePost", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "UpdatePost", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "DeletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseInterceptors)(logget_interceptor_1.LoggerInterceptor),
    (0, common_1.UseFilters)(exception_filter_1.ApiExceptionFilter),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map