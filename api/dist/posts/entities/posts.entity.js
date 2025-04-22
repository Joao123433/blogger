"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const openapi = require("@nestjs/swagger");
class Posts {
    id;
    title;
    introduction;
    story;
    conclusion;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, introduction: { required: true, type: () => String }, story: { required: true, type: () => String }, conclusion: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.Posts = Posts;
//# sourceMappingURL=posts.entity.js.map