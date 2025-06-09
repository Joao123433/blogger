import { PostsFetch } from "./PostsFetch";

export interface PostDataContext {
  posts: PostsFetch[];
  selectedPost: (postId: string) => PostsFetch | undefined;
}