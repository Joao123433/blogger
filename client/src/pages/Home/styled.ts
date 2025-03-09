import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
`;

export const IntroContainer = styled.section`
  min-height: 590px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  margin-top: 3rem;

  &::after {
    content: "";
    width: 374px;
    height: 374px;
    position: absolute;
    left: calc(50% - 187px);
    z-index: -1;

    background-color: #FFD66B;
    border-radius: 50%;

    @media (min-width: 601px) {
      display: grid;
      width: 550px;
      height: 550px;
      left: calc(50% - 250px);
    }
  }

  @media (max-width: 600px) {
    min-height: 390px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;

  grid-column: span 1;

  p {
    font-weight: bold;

  }

  h1 {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    margin-top: 5rem;

    h1 {
      font-size: 50px;
    }
  }
`;

export const InfoContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .8rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      line-height: 1.76rem;
    }

    a {
      color: black;
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

export const AboutMeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
   
    a {
      color: black;
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
`;
