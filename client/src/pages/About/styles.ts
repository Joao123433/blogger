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
  
    @media (max-width: 600px) {
      font-size: 50px;
    }
  }
`;

export const PicturesContainer = styled.section`
  background-color: ${(props) => props.theme['bg-dark']};
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  padding: 5rem 1rem;
`;

export const ImageContainer = styled.div`
  max-width: 1170px;
  margin: auto;
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
  }
`;

export const PortraitContainer = styled.section`
  max-width: 1170px;
  margin: auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 5rem 1rem;

  img {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    h1 {
      font-size: 2rem;
    }
  }


  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
