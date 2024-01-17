/**
 * Obtiene una lista paginada de posts.
 * Es necesario agregar .populate('idAuthor', '_id nickName') en el llamado a DB
 * @param post Objeto post devuelto por MongoDB.
 * @returns Post formateado.
 */
export const toJSON = (post: any) => {
  return post.toObject({
    transform: (doc: any, ret: Record<string, any>) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      if (ret.idAuthor) {
        ret.author = {
          id: ret.idAuthor.id,
          nickName: ret.idAuthor.nickName,
        };
        delete ret.idAuthor;
      }
    },
  });
};
