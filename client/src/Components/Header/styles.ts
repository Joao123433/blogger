import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4.3rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
