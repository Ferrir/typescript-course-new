import { Application } from 'express'
import { RouterModuleFactory } from './router-map'
import { IFeatureModuleRouterInfo, IHttpVerbMap } from '../../core/router/base-routes-module';

export class RouterModule {
   private routerModuleFactory: RouterModuleFactory
   private express: Application

   constructor(app: Application) {
      this.express = app;
      this.routerModuleFactory = new RouterModuleFactory()
   }

   public exposeRoutes(authenticate?: Function): void {
      const registeredModules = this.routerModuleFactory.getRegisteredModules()
      if(registeredModules && Array.isArray(registeredModules)) {
         registeredModules
            .forEach(this.extractRouterInfoFromModule.bind(this, authenticate))

      }
   }
   
   private extractRouterInfoFromModule(authenticate: Function, routerFeatModule: IHttpVerbMap) {
      if(routerFeatModule) {
         const registeredVerbs = Object.keys(routerFeatModule)
         registeredVerbs.forEach(this.extractInfoByVerb.bind(this, authenticate, routerFeatModule))
      }

   }

   private extractInfoByVerb(authenticate: Function, routerFeatModule: IHttpVerbMap, registeredVerb: string) {
      routerFeatModule[registeredVerb]
         .forEach(this.mountRoutes.bind(this, authenticate, registeredVerb))
   }

   private mountRoutes(authenticate: Function, registeredVerb: string, routerInfo: IFeatureModuleRouterInfo) {
      if(routerInfo) {
         const { isProtected, callback, endpoint } = routerInfo
         console.log (isProtected, callback, endpoint)
         isProtected
            ? this.express.route(endpoint).all(authenticate())[registeredVerb](callback)
            : this.express.route(endpoint)[registeredVerb](callback)
      }
   }
}