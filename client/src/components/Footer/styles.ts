import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: none;
  padding: 4.5rem 0;

  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .8rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    nav {
      display: flex;
      flex-direction: column;
      gap: .4rem;
    }
  }
`;
