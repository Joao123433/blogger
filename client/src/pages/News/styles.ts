import styled from 'styled-components';

export const TitleContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-width: 1170px;
  margin: auto;

  height: 20rem;
  padding: 0 1rem;

  h1 {
    font-size: 100px;
  }
  
  @media (max-width: 600px) {
    height: 10rem;

    h1 {
      font-size: 50px;
    }
  }
`;

export const BlogsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 1rem 4rem;
  gap: 2rem;

  max-width: 1170px;
  margin: auto;

  div {
    display: flex;
    flex-direction: column;
    gap: .8rem;

    img {
      width: 100%;

      &:hover {
        opacity: .93;
      }
    }

    a {
      font-size: 2.6rem;
      font-weight: 800;
      text-decoration: none;
      line-height: 3rem;
      color: ${(props) => props.theme['text-black']};

      &:hover {
        color: ${(props) => props.theme['gray-600']};
      }


      @media (max-width: 800px) {
        font-size: 2rem;
      }
    }

    span {
      font-size: .9rem;
      color: ${(props) => props.theme['gray-600']};
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);


    div {
      gap: .5rem;

      a {
        font-size: 1.8rem;
      }

      p {
        line-height: 1.6rem;
      }
    }
  }
`;
