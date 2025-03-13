import { NavLink } from "react-router-dom";
import { BlogTopicsContainer, ContactContainer, ImgContainer } from "./styles";

export function BlogTopics() {
  return (
    <BlogTopicsContainer>
      <p>Minimized simplicity</p>
      <h1>Blog Topics</h1>
      <ImgContainer>
        <div>
          <img src="https://mllj2j8xvfl0.i.optimole.com/w:400/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-01-1.jpg"  alt="" />
          <h3>People</h3>
          <NavLink to="/news">View Post</NavLink>
        </div>
        <div>
          <img src="https://mllj2j8xvfl0.i.optimole.com/w:400/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-06-1.jpg" alt="" />
          <h3>Urban</h3>
          <NavLink to="/news">View Post</NavLink>
        </div>
        <div>
          <img src="https://mllj2j8xvfl0.i.optimole.com/w:230/h:345/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-11-ogw6v2xhiykjkglcbcath685qobodkmr0r3cplch9s.jpg" alt="" />
          <h3>Abstract</h3>
          <NavLink to="/news">View Post</NavLink>
        </div>
      </ImgContainer>
      <ContactContainer>
        <span>Minimized simplicity</span>
        <h1>Follow along the journey</h1>
        <p>Follow me on social and never miss a post from this blog. Only original content and minimalist views, shared daily on social.</p>
      </ContactContainer>
    </BlogTopicsContainer>
  )
}