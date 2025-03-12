import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
`;

export const IntroContainer = styled.section`
  max-width: 1170px;
  margin: auto;
  min-height: 590px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 2.5rem 1rem;

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
