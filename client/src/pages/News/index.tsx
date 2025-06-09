import { NavLink } from "react-router-dom";
import { BlogsContainer, TitleContainer } from "./styles";
import { UsePosts } from "../../hooks/UsePosts";
import { format } from "date-fns";

export function News() {
  const { posts } = UsePosts()

  return (
    <>
      <TitleContainer>
        <h1>News</h1>
      </TitleContainer>
      <BlogsContainer>
        {posts.map((post) => (
          <div key={post.id}>
            <NavLink to={`/news/new/${post.id}`}>
              <img src={post.foto} alt="" />
            </NavLink>
            <NavLink to={`/news/new/${post.id}`}>{post.title}</NavLink>
            <span>{format(post.created_at, 'MMMM dd, yyyy')}</span>
            <p>
              {post.introduction.length > 250 ?
                <>
                  {post.introduction.slice(0, 250).trim()}… <NavLink to={`/news/new/${post.id}`}>Read More »</NavLink>
                </> : post.introduction
              }
            </p>
          </div>
        ))}
      </BlogsContainer>
    </>
  )
}