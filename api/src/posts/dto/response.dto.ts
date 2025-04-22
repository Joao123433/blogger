export class ResponseFindPostDto {
  id: string;
  title: string;
  introduction: string;
  story: string;
  conclusion: string;
  created_at: Date | null;
  Comments: {
    user: {
      created_at: Date | null;
      name: string;
      email: string;
    }
    comment: string;
  }[];
  user: {
    created_at: Date | null;
    name: string;
    email: string;
  };
}

export class ResponseCreatePostDto {
  id: string;
  title: string;
  introduction: string;
  story: string;
  conclusion: string;
  created_at: Date | null;
  userId: string;
  Comments: {
      id: string;
      created_at: Date | null;
      updated_at: Date | null;
      userId: string;
      comment: string;
      postId: string;
  }[];
}