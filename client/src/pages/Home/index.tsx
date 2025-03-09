import { NavLink } from "react-router-dom";
import { AboutMeContainer, HomeContainer, InfoContainer, IntroContainer, TitleContainer } from "./styled";

export function Home() {
  return (
    <HomeContainer>
      <IntroContainer>
        <div />
        <TitleContainer>
          <p>Minimized simplicity</p>
          <h1>The minimal blog</h1>
        </TitleContainer>
      </IntroContainer>
      
      <InfoContainer>
        <div>
          <h2>Blog Posts</h2>
          <p>Discover inspiring articles on fashion and photography. Stay updated with trends that ignite your imagination.</p>
          <NavLink to="/news">View Posts</NavLink>
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
      <AboutMeContainer>
        <div>
          <h6>ABOUT ME</h6>
          <h1>Welcome friend.</h1>
          <p>I am Joshua, a blogger based in San Francisco, blogging about minimalism and simplicity.</p>
          <NavLink to="/news">Go to blog</NavLink>
        </div>
        <div>
          <img src="https://mllj2j8xvfl0.i.optimole.com/w:600/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-02-1.jpg" alt="" />
        </div>
      </AboutMeContainer>
    </HomeContainer>
  )
    
}