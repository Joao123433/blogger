import { Drawer } from '@mui/material';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  max-width: 1170px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 4.3rem;
  justify-content: space-between;
  padding: 0 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme['text-black']};

    border-bottom: 3px solid transparent;
      
    position: relative;
    padding-bottom: 5px;
  }

  svg {
    cursor: pointer;
  }

  svg:hover {
    color: ${(props) => props.theme['gray-500']};
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

  a::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0;
    height: 3px;
    background-color: transparent;
    transition: all .2s ease-out;
  }

  a:hover::after {
    width: 100%;
    left: 0;
    background-color: ${(props) => props.theme['gray-500']};
  }

  a.active {
    color: ${(props) => props.theme['gray-500']};
  }


  svg {
    border-bottom: 3px solid transparent;
    padding-bottom: 5px;
  }
`;

export const HamburguerContainer = styled.div`
  display: flex;

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

    svg:hover {
      color: ${(props) => props.theme['gray-500']};
    }

    a {
      text-align: right;
      text-decoration: none;
      color: ${(props) => props.theme['text-black']};

      border-bottom: 3px solid transparent;
      font-size: 1.1rem;

      width: 100%;
      position: relative;
      padding-bottom: 5px;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 3px;
        background-color: transparent;
        transition: all .2s ease-out;
      }

      &:hover::after {
        width: 100%;
        left: 0;
        background-color: ${(props) => props.theme['gray-500']};
      }

      &.active {
        color: ${(props) => props.theme['gray-500']};
      }
    }
  }
`;
