import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: none;
  padding: 4.5rem 1rem;
  background-color: ${(props) => props.theme['bg-dark']};
  color: ${(props) => props.theme['text-white']};

  @media (min-width: 1000px) {
    display: block;
  }

  section {
    max-width: 1170px;
    margin: auto;
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .8rem;

    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h3 {
        font-size: 1.6rem;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: .4rem;

        p {
          font-weight: normal;
        }
      }
    }
  }
`;
