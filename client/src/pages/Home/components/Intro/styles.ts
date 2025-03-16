import styled from 'styled-components';

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

    background-color: ${(props) => props.theme['bg-circle']};
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
