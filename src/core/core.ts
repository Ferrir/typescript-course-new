import * as express from 'express'
import { Application, Request, Response, NextFunction } from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import RouterModule from './router/routes'
import ResponseHandlers from './handlers/response-handlers'
import { AuthService } from '../modules/auth/auth-service'

const { secret } = require('../config/env')

export class CoreModule {
   private _express: Application
   private authService
   private routerModule: RouterModule

   constructor() {
      this._express = express()
      this.authService = new AuthService(secret).setStrategy()
      this.configExpress()
      this.routerModule = new RouterModule(this._express)
      this.configExpress()
      this.router() 
   }

   public get express(): Application {
      return this._express
   }

   private configExpress(): void {
      this.express.use(this.configHarders.bind(this));
      this.express.use(bodyParser.urlencoded( { extended: true } ))
      this.express.use(bodyParser.json())
      this.express.use(ResponseHandlers.errorHandlerApi)
      this.express.use(this.authService.initialize())
   }

   private router(): void {
      this.routerModule.exposeRoutes(this.authService.authenticate)
   }

   private configHarders(req: Request, res: Response, next: NextFunction) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Witdh, Content-Type, Accept')
      next()
   }
}

