import { IAuthor } from "../author/interface";

export interface IPost {
   readonly id: number
   title: string
   text: string
   authorId?: number
   Author?: IAuthor
}

export function createPost({id, title, text, Author}: any): IPost {
   return {
      id, title, text, Author
   }
}

export function createPosts(data: any[]): IPost[] {
   return data.map(createPost)
}