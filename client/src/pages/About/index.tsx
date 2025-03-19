import { NavLink } from "react-router-dom"; 
import { LeanMoreContainer, LeanMoreLayout, MyStoryContainer, PortraitContainer, TitleContainer } from "./styles";

export function About() {
  return (
    <>
      <TitleContainer>
        <h1>About me</h1>
      </TitleContainer> 

      <PortraitContainer>
        <img src="https://mllj2j8xvfl0.i.optimole.com/w:405/h:402/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2019/11/neve-minimal-blogger-03.jpg" alt="" />
        <div>
          <h5>Minimized simplicity</h5>
          <h1>I love simplicity</h1>
          <p>Over the past decade, I’ve traveled from the bustling streets of Paris to the serene beaches of Bali, collaborating with designers, models, and creatives to tell stories that inspire. My work has been featured in renowned fashion magazines and campaigns, but my heart lies in showcasing the raw, unfiltered beauty that exists behind the scenes.​</p>
        </div>
      </PortraitContainer>

      <LeanMoreLayout>
        <LeanMoreContainer>
          <div>
            <h1>Blog Posts</h1>
            <p>I create engaging and insightful articles that capture the essence of fashion and lifestyle trends. With expertly crafted content, I help you connect with your audience and elevate your brand’s voice. Each post is tailored to blend storytelling with a deep understanding of the fashion industry.</p>
            <NavLink>Go to blog</NavLink>
          </div>
          <div>
            <h1>Services</h1>
            <p>My photography services deliver high-quality fashion visuals that highlight style, detail, and personality. From creative shoots for campaigns and lookbooks to editorial features, I ensure every image stands out. I work with precision and creativity to bring your vision to life with elegance and impact.</p>
            <NavLink>Learn More</NavLink>
          </div>
        </LeanMoreContainer>
      </LeanMoreLayout>

      <MyStoryContainer>
        <h6>WHAT I BLOG ABOUT</h6>
        <h1>My Story</h1>
        <div>&nbsp;</div>
        <p>This blog is where I blend my love for photography and fashion with storytelling. Here, I share the journey behind the camera—what it takes to frame the perfect shot, the creative chaos of a shoot, and my reflections on how fashion continues to evolve. You’ll also find tips for aspiring photographers, insights into the industry, and a celebration of the moments that inspire me every day.</p>
      </MyStoryContainer>

    </>
  )
}