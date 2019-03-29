import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/responses/handlers'
import Post from './service'

 class PostController {

   constructor() {}  

   getAll(req: Request, res: Response) {
      Post
         .getAll()
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao buscar todas as postagem`))
   }

   create(req: Request, res: Response) {
      Post
         .create(req.body)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.dbErrorHandler, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao criar uma nova postagem`))
   }

   getById(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      Post
         .getById(parseInt(req.params.id))
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao consultar a postagem id = ${id}`))
   }

   update(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      const props = req.body
      Post
         .update(id, props)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao atualizar a postagem id = ${id}, com ${props}`))
   }

   delete(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      Post
         .delete(id)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao deletar a postagem id = ${id}`))
   }
 }

 export default new PostController()