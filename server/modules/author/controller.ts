import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/responses/handlers'
import Author from './service'

 class AuthorController {

   constructor() {
   }  

   getAll(req: Request, res: Response) {
      Author
         .getAll()
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os autores`))
   }

   create(req: Request, res: Response) {
      Author
         .create(req.body)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.dbErrorHandler, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao criar um novo autor`))
   }

   getById(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      Author
         .getById(parseInt(req.params.id))
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao consultar o autor id = ${id}`))
   }

   update(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      const props = req.body
      Author
         .update(id, props)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao atualizar o autor id = ${id}, com ${props}`))
   }

   delete(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      Author
         .delete(id)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao deletar o autor id = ${id}`))
   }
 }

 export default new AuthorController()