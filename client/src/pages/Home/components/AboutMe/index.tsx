import { NavLink } from "react-router-dom";
import { AboutMeContainer } from "./styles";

export function AboutMe() {
  return (
    <AboutMeContainer>
      <section>
        <div>
          <h6>ABOUT ME</h6>
          <h1>Welcome friend.</h1>
          <p>I am Joshua, a blogger based in San Francisco, blogging about minimalism and simplicity.</p>
          <NavLink to="/news">Go to blog</NavLink>
        </div>
        <div>
          <img src="https://mllj2j8xvfl0.i.optimole.com/w:600/h:600/q:mauto/f:best/ig:avif/https://demosites.io/blogger-gb/wp-content/uploads/sites/388/2020/10/neve-minimal-blogger-02-1.jpg" alt="" />
        </div>
      </section>
    </AboutMeContainer>
  )
}