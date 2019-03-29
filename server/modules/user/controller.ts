import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/responses/handlers'
import User from './service'

 class UserController {

   constructor() {
   }  

   getAll(req: Request, res: Response) {
      User
         .getAll()
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os usuários`))
   }

   createUser(req: Request, res: Response) {
      User
         .create(req.body)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.dbErrorHandler, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao criar um novo usuário`))
   }

   getById(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      User
         .getById(parseInt(req.params.id))
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao consultar o usuário id = ${id}`))
   }

   updateUser(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      const props = req.body
      User
         .update(id, props)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao atualizar o usuário id = ${id}, com ${props}`))
   }

   deleteUser(req: Request, res: Response) {
      const id = parseInt(req.params.id)
      User
         .delete(id)
         .then(_.partial(Handlers.onSuccess, res))
         .catch(_.partial(Handlers.onError, res, `Erro ao deletar o usuário id = ${id}`))
   }
 }

 export default new UserController()