import styled from 'styled-components';

export const AboutMeContainer = styled.section`
  background-color: ${(props) => props.theme['bg-dark']};
  color: ${(props) => props.theme['text-white']};

  section {
    margin: auto;
    max-width: 1170px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 2.5rem 1rem;
  
  
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
  
      h6 {
        font-weight: bold;
      }

      h1 {
        font-size: 2rem;
      }
     
      a {
        color: ${(props) => props.theme['text-white']};
        width: fit-content;
  
        &:hover {
          color: ${(props) => props.theme['gray-500']};
        }
      }
  
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;
