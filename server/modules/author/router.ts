import { Request, Response } from 'express'
import AuthorController from './controller'

class AuthorRoutes {

   constructor() {
   }

   index(req: Request, res: Response) {
      return AuthorController.getAll(req, res)
   }

   create(req: Request, res: Response) {
      return AuthorController.create(req, res)
   }

   findOne(req: Request, res: Response) {
      return AuthorController.getById(req, res)
   }

   update(req: Request, res: Response) {
      return AuthorController.update(req, res)
   }

   destroy(req: Request, res: Response) {
      return AuthorController.delete(req, res)
   }
}

export default new AuthorRoutes()