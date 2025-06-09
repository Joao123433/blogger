import styled from "styled-components";

interface ContainerProps {
  background?: string
}

export const Container = styled.section<ContainerProps>`
  position: relative;
  background-image: ${({ background }) => background ? `url(${background})` : 'none'};
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  margin-bottom: 5rem;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* opacidade escura */
  z-index: 1;
`

export const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  background-color: #0e0e10;
  padding: 2rem 3rem;
  margin: 0 5rem;
  border-radius: 4px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  span {
    font-size: 1rem;
    color: #ccc;
  }
`

export const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 4rem;
  gap: 1rem;

  max-width: 1170px;
  margin: auto;

  h2 {
    font-size: 3.5rem;
  }

  p {
    line-height: 1.7rem;
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;