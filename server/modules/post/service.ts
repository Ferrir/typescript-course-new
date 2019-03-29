import { IPost, createPost, createPosts }  from './interface'
import * as BlueBird from 'bluebird'
import { IAuthor } from '../author/interface';
const model = require('../../models')

class Post implements IPost {
   public id: number
   public title: string
   public text: string
   public authorId?: number
   public Author?: IAuthor

   constructor() {}

   create(post: any) {
      return model.Post.create(post)
   }

   getAll(): BlueBird<IPost[]> {
      return model.Post.findAll({
         order: ['title'],
         include: [ { model: model.Author } ]
      })
      .then(createPosts)
   }

   getById(id: number): BlueBird<IPost> {
      return model.Post.findOne({
         where: {id},
         order: ['title'],
         include: [ { model: model.Author } ]
      })
      .then(createPost)
   }

   update(id: number, post: any) {
      return model.Post.update(post, {
         where: {id},
         fields: ['title', 'text', 'authorId'],
         hooks: true,
         individualHooks: true
     });
   }

   delete(id: number) {
      return model.Post.destroy({
         where: {id}
     })
   }
}

export default new Post()