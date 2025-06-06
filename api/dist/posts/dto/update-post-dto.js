"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const create_posts_dto_1 = require("./create-posts.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdatePostDto extends (0, swagger_1.PartialType)(create_posts_dto_1.CreatePostDto) {
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=update-post-dto.js.map