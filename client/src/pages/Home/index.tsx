import { HomeContainer } from "./styles";
import { Intro } from "./components/Intro";
import { Information } from "./components/Information";
import { AboutMe } from "./components/AboutMe";
import { BlogTopics } from "./components/BlogTopics";

export function Home() {
  return (
    <HomeContainer>
      <Intro />
      <Information />
      <AboutMe />
      <BlogTopics />
    </HomeContainer>
  )
    
}