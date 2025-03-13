import { ImageContainer, PicturesContainer, PortraitContainer, TitleContainer } from "./styles";

export function About() {
  return (
    <>
      <TitleContainer>
        <h1>About me</h1>
      </TitleContainer>    

      <PicturesContainer>
        <ImageContainer>
          <div>
            <img src="https://mllj2j8xvfl0.i.optimole.com/w:400/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-01-1.jpg"  alt="" />
          </div>
          <div>
            <img src="https://mllj2j8xvfl0.i.optimole.com/w:400/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-06-1.jpg" alt="" />
          </div>
          <div>
            <img src="https://mllj2j8xvfl0.i.optimole.com/w:230/h:345/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-11-ogw6v2xhiykjkglcbcath685qobodkmr0r3cplch9s.jpg" alt="" />
          </div>
        </ImageContainer>
      </PicturesContainer>

      <PortraitContainer>
        <img src="https://mllj2j8xvfl0.i.optimole.com/w:405/h:402/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2019/11/neve-minimal-blogger-03.jpg" alt="" />
        <div>
          <h5>Minimized simplicity</h5>
          <h1>I love simplicity</h1>
          <p>Over the past decade, I’ve traveled from the bustling streets of Paris to the serene beaches of Bali, collaborating with designers, models, and creatives to tell stories that inspire. My work has been featured in renowned fashion magazines and campaigns, but my heart lies in showcasing the raw, unfiltered beauty that exists behind the scenes.​</p>
        </div>
      </PortraitContainer>
    </>
  )
}