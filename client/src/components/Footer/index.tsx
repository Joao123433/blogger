import { NavLink } from "react-router-dom";
import { FooterContainer } from "./styles";

export function Footer() {
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
            <NavLink to="/news">Blog tips for beginners</NavLink>
            <NavLink to="/news">Join Zabibas Global Giveaway</NavLink>
            <NavLink to="/news">Why is living coral color of the year?</NavLink>
            <NavLink to="/news">Venice Stay & Thoughts</NavLink>
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