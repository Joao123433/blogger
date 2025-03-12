import styled from 'styled-components';

export const InfoContainer = styled.section`
  max-width: 1170px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .8rem;
  padding: 2.5rem 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      line-height: 1.76rem;
    }

    a {
      color: ${(props) => props.theme['text-black']};
      width: fit-content;


      &:hover {
        color: ${(props) => props.theme['gray-500']};
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
