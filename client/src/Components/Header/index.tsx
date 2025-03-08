import { NavLink } from "react-router-dom";
import { HeaderContainer, NavContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <h1>
        <NavLink to="/">Blogger</NavLink>
      </h1>
      <NavContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavContainer>
    </HeaderContainer>
  )
}