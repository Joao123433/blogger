import { NavLink } from "react-router-dom";
import { FooterContainer } from "./styles";
import { UsePosts } from "../../hooks/UsePosts";

export function Footer() {
  const { posts } = UsePosts()

  return (
    <FooterContainer>
      <section>
        <div>
          <h3>About Me</h3>
          <p>Welcome to my Blog! Sharing stories, insights, and inspiration to spark your creativity and curiosity. Join the conversation and stay connected.</p>
        </div>
        <div>
          <h3>Popular Posts</h3>
          <nav>
            {posts.map((post) => (
              <NavLink to={`/news/new/${post.id}`}>{post.title}</NavLink>
            ))}
          </nav>
        </div>
        <div>
          <h3>Photo of the day</h3>
          <p>Welcome to my Blog! Sharing stories, insights, and inspiration to spark your creativity and curiosity. Join the conversation and stay connected.</p>
        </div>
      </section>
    </FooterContainer>
  )
}