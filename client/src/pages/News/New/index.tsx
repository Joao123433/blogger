import { useParams } from "react-router-dom";
import { UsePosts } from "../../../hooks/UsePosts";
import { Container, Content, Overlay, TextContainer } from "./styles";
import { format } from "date-fns";

export function New() {
  const { postId } = useParams();
  const { selectedPost } = UsePosts()
  const post = selectedPost(postId!)

  return (
    <>
      <Container background={post?.foto}>
        <Overlay />
        <Content>
          <h1>{post?.title}</h1>
          <span>{post?.created_at && format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
        </Content>
      </Container>
      <TextContainer>
        <h2>Introduction</h2>
        <p>{post?.introduction}</p>
      </TextContainer>
      <TextContainer>
        <h2>Story</h2>
        <p>{post?.story}</p>
      </TextContainer>
      <TextContainer>
        <h2>Conclusion</h2>
        <p>{post?.conclusion}</p>
      </TextContainer>
    </>
  )
}