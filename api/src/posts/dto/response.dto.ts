export class ResponseOtherDto {
  id: string;
  title: string;
  introduction: string;
  story: string;
  conclusion: string;
  created_at: Date | null;
  Comments: {
    id: string;
    comment: string;
    user: {
      created_at: Date | null;
      name: string;
      email: string;
    }
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
  user: {
    name: string;
    email: string;
    created_at: Date | null;
  };
}