import { Request, Response } from 'express'
import { BaseRouterModule, IModuleEndpointMap } from '../../core/router/base-routes-module';
//import User from '../user/user.service'
//import ResponseHandlers from '../../core/handlers/response-handlers'

export class AuthRouterModule extends BaseRouterModule {
   constructor() {
      super('auth')
   }

   protected MODULES_ENDPOINT_MAP: IModuleEndpointMap = {
      [this.moduleName]: {
         post: [{
            endpoint: `${ this.context }/${ this.version }/${ this.moduleName }/token`,
            callback: this.auth,
            isProtected: false
         }]
      }
   }

   async auth(req: Request, res: Response) {
      const { email, password } = req.body
      console.log(email, password)
      // if (email && password) {
      //    try {
      //       const user = await User.getByEmail(email)
      //       ResponseHandlers.authSuccess(res, password, user)
      //    } catch (error) {
      //       ResponseHandlers.authFail(req, res)
      //    }
      // } else {
      //    return ResponseHandlers.onError('É necessário informar o email e senha', 'no-credentials')
      // }
   }
}