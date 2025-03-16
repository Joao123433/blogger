import { NavLink } from "react-router-dom";
import { BlogsContainer, TitleContainer } from "./styles";

export function News() {
  return (
    <>
      <TitleContainer>
        <h1>News</h1>
      </TitleContainer>

      <BlogsContainer>
        <div>
          <NavLink>
            <img src="https://mllj2j8xvfl0.i.optimole.com/w:900/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2019/11/neve-minimal-blogger-10.jpg" alt="" />
          </NavLink>
          <NavLink>2020 trends in home decor</NavLink>
          <span>November 26, 2019</span>
          <p>Introduction Readymade godard brooklyn, kogi shoreditch hashtag hella shaman kitsch man bun pinterest flexitarian. Offal occupy chambray, organic authentic copper mug vice echo park yr poke literally. Ugh coloring book fingerstache schlitz retro cronut man…</p>
        </div>
      </BlogsContainer>
    </>
  )
}