import { NavLink } from "react-router-dom";
import { DrawerContainer, HamburguerContainer, HeaderContainer, NavContainer } from "./styles";
import { List, X } from "phosphor-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <h1>
        <NavLink to="/">Blogger</NavLink>
      </h1>
      <NavContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/news">News</NavLink>
        {/* <NavLink to="/contact">Contact</NavLink> */}
        {/* <User size={25} /> */}
      </NavContainer>
      <HamburguerContainer>
        <List size={32} onClick={() => setOpen(true)} />
        <DrawerContainer anchor="right" open={open} onClose={() => setOpen(false)}>
          <X size={32} onClick={() => setOpen(false)} />
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/news" onClick={() => setOpen(false)}>News</NavLink>
          {/* <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)}>User</NavLink> */}
        </DrawerContainer>
      </HamburguerContainer>
    </HeaderContainer>
  )
}