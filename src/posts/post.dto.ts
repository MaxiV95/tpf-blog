import { ApiProperty } from '@nestjs/swagger';

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   categories: string[];
//   author: string;
// }

const titleProperty: Record<string, string> = {
  description: 'Titulo del post.',
  example: 'Nuevo post',
};
const contentProperty: Record<string, string> = {
  description: 'Contenido del post.',
  example: 'Este es un ejemplo de contenido de post',
};
const categoriesProperty: Record<string, any> = {
  description: 'Arreglo de categorías.',
  example: ['Nuevo', 'Ejemplo'],
};

export class PostDto {
  @ApiProperty(titleProperty)
  readonly title: string;
  @ApiProperty(contentProperty)
  readonly content: string;
  @ApiProperty(categoriesProperty)
  readonly categories?: string[];
}

export class PostDB {
  @ApiProperty(titleProperty)
  readonly title: string;
  @ApiProperty(contentProperty)
  readonly content: string;
  @ApiProperty(categoriesProperty)
  readonly categories?: string[];
  @ApiProperty({
    description: 'Usuario que lo creo.',
    example: { id: '6570bb7db2ad523394706c12', nickName: 'MaxiV95' },
  })
  readonly author: string;
}
