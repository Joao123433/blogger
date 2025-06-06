"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const logger_middleware_1 = require("../commom/middlewares/logger.middleware");
const comments_module_1 = require("../comments/comments.module");
const serve_static_1 = require("@nestjs/serve-static");
const posts_module_1 = require("../posts/posts.module");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const node_path_1 = require("node:path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: "*",
            method: common_1.RequestMethod.ALL
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            posts_module_1.PostsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, node_path_1.join)(__dirname, '..', '..', 'files'),
                serveRoot: "/files"
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map