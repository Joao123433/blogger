import { createContext, useEffect, useState } from "react";
import { PostDataContext } from "../interfaces/PostDataContext";
import { ChildrenInterface } from "../interfaces/Children";
import { api } from "../services/api";
import { PostsFetch } from "../interfaces/PostsFetch";

export const PostContext = createContext<PostDataContext>({} as PostDataContext)

export function PostProvider({ children }: ChildrenInterface) {
  const [posts, setPosts] = useState<PostsFetch[]>([])

  useEffect(() => {
    async function fetchApi() {
      const postsResponse = await api.get("posts");
      setPosts(postsResponse.data)
    }

    fetchApi()
  }, [])

  const selectedPost = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    return post
  }

  return (
    <PostContext.Provider value={{ posts, selectedPost }}>
      {children}
    </PostContext.Provider>
  )
}