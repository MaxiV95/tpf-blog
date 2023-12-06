export interface Post {
  title: string;
  content: string;
  categories: string[];
  author: string;
}

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly categories: string[];
  readonly author: string;
}

export class UpdatePostDto {
  readonly title: string;
  readonly content: string;
  readonly categories: string[];
  readonly author: string;
}
