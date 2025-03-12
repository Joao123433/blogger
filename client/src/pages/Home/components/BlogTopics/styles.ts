import styled from 'styled-components';

export const BlogTopicsContainer = styled.section`
  max-width: 1170px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  padding: 2.5rem 1rem;

  p {
    font-weight: bold;
  }

  h1 {
    font-size: 3rem;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-basis: 33.33%;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    img {
      width: 100%;
    }

    h3 {
      font-size: 1.5rem;
    }

    a {
      color: ${(props) => props.theme['text-black']};
      width: fit-content;

      &:hover {
        color: ${(props) => props.theme['gray-500']};
      }
    }
  }
`;

export const ContactContainer = styled.section`
  max-width: 1170px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
  padding: 3rem 7rem;

  @media (max-width: 600px) {
    padding: 3rem 1rem;
  }

  span {
    font-weight: bold;
  }

  h1 {
    text-align: center;
  }

  p {
    font-weight: normal;
    text-align: center;
  }
`;
