export class ReponseGetComment {
  id: string;
  created_at: Date | null;
  updated_at: Date | null;
  comment: string;
  postId: string;
  userId: string;
}


export class ResponseUpdateComment {
  id: string;
  comment: string;
  created_at: Date | null;
  updated_at: Date | null;
}