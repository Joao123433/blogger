export class ResponseFindUserDto {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  Posts: {
      id: string;
      created_at: Date | null;
      title: string;
      introduction: string;
  }[];
  Comments: {
    id: string;
    comment: string;
    created_at: Date | null
  }[];
}

export class ResponseCreateUserDto {
  id: string;
  name: string;
  email: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export class ResponseUpdateUserDto {
  id: string;
  name: string;
  email: string;
}

export class ResponseUpdateAvatarDto {
  id: string;
  name: string;
  email: string;
  avatar: string | null
}