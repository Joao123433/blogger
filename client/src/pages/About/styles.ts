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
    height: 5rem;

    h1 {
      font-size: 50px;
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
  gap: 2rem;
  padding: 3rem 1rem 4rem;

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

export const LeanMoreLayout = styled.section`
  background-color: ${(props) => props.theme['bg-dark']};
  color: ${(props) => props.theme['text-white']};
`;

export const LeanMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  max-width: 1170px;
  padding: 4rem 1rem;
  margin: auto;

  div {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    h1 {
      font-size: 1.5rem;
    }

    p {
      line-height: 1.7rem;
    }

    a {
      color: white;
      width: fit-content;
    }

    a:hover {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const MyStoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1170px;
  min-height: 590px;
  padding: 4rem 1rem;
  margin: auto;

  &::after {
    content: "";
    width: 150px;
    height: 150px;
    left: calc(50% - 75px);

    background-color: ${(props) => props.theme['bg-circle']};
    border-radius: 50%;

    /* @media (min-width: 601px) {
      display: grid;
      width: 150px;
      height: 150px;
      left: calc(50% - 75px);
    } */
  }

`;
