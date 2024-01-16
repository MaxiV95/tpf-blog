// post.dto.ts
import { ApiProperty } from '@nestjs/swagger';

const idProperty: Record<string, any> = {
  description: 'id del post.',
  example: '6570bb7db2ad523394706c13',
  type: String,
};
const titleProperty: Record<string, any> = {
  description: 'Titulo del post.',
  example: 'Nuevo post',
  type: String,
};
const contentProperty: Record<string, any> = {
  description: 'Contenido del post.',
  example: 'Este es un ejemplo de contenido de post',
  type: String,
};
const categoriesProperty: Record<string, any> = {
  description: 'Arreglo de categorías.',
  example: ['Nuevo', 'Ejemplo'],
  type: [String],
};
const authorProperty: Record<string, any> = {
  description: 'Usuario que lo creo.',
  example: { id: '6570bb7db2ad523394706c12', nickName: 'MaxiV95' },
  type: Object,
};

export class PostDto {
  @ApiProperty(titleProperty)
  readonly title: string;
  @ApiProperty(contentProperty)
  readonly content: string;
  @ApiProperty(categoriesProperty)
  readonly categories?: string[];
}

export class PostDB extends PostDto {
  @ApiProperty(idProperty)
  readonly id: string;
  @ApiProperty(authorProperty)
  readonly author: object;
}

export class ReducedPostDB {
  @ApiProperty(idProperty)
  readonly id: string;
  @ApiProperty(titleProperty)
  readonly title: string;
  @ApiProperty(contentProperty)
  readonly content: string;
}

export class ModeratedPostDTO extends PostDto {
  @ApiProperty({
    description: 'Opciones de moderación.',
    example: { delete: false, edit: true },
    type: Object,
  })
  moderationOptions: {
    delete?: boolean;
    edit?: boolean;
  };
}
