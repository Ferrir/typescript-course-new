import { Request, Response } from 'express'
import PostController from './controller'

class PostRoutes {

   constructor() {
   }

   index(req: Request, res: Response) {
      return PostController.getAll(req, res)
   }

   create(req: Request, res: Response) {
      return PostController.create(req, res)
   }

   findOne(req: Request, res: Response) {
      return PostController.getById(req, res)
   }

   update(req: Request, res: Response) {
      return PostController.update(req, res)
   }

   destroy(req: Request, res: Response) {
      return PostController.delete(req, res)
   }
}

export default new PostRoutes()