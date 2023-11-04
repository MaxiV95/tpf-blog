export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly categories: string[];
}

export class UpdatePostDto {
  readonly title: string;
  readonly content: string;
  readonly categories: string[];
}
