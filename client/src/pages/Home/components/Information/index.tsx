import { NavLink } from "react-router-dom"
import { InfoContainer } from "./styles"

export function Information() {
  return (
    <InfoContainer>
      <div>
        <h2>Blog Posts</h2>
        <p>Discover inspiring articles on fashion and photography. Stay updated with trends that ignite your imagination.</p>
        <NavLink to="/news">View Post</NavLink>
      </div>
      <div>
        <h2>Services</h2>
        <p>Offering fashion photography and blog content that bring ideas to life. Let’s create bold, impactful stories together.</p>
        <NavLink to="/contact">Get in Touch</NavLink>
      </div>
      <div>
        <h2>About me</h2>
        <p>I’m a fashion photographer and blogger, capturing style and individuality through artful and engaging storytelling.</p>
        <NavLink to="/about">About Me</NavLink>
      </div>
    </InfoContainer>
  )
}