import { Drawer } from '@mui/material';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4.3rem;
  justify-content: space-between;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: black;

    border-bottom: 3px solid transparent;
  }
`;

export const NavContainer = styled.nav`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  @media (min-width: 1000px) {
    display: flex;
  }

  a:hover {
    border-bottom: 3px solid ${(props) => props.theme['gray-100']};
  }

  a.active {
    color: ${(props) => props.theme['gray-100']};
  }
`;

export const HamburguerContainer = styled.div`
  display: flex;

  svg {
    cursor: pointer;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

export const DrawerContainer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    padding: 18px 14px;

    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem;

    svg {
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: black;

      border-bottom: 3px solid transparent;
      font-size: 1.1rem;
    }

    a:hover {
      border-bottom: 3px solid ${(props) => props.theme['gray-100']};
    }

    a.active {
      color: ${(props) => props.theme['gray-100']};
    }
  }
`;
