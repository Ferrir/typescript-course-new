import { IModuleEndpointMap, IFeatureModuleRouterInfo } from './base-routes-module';
import { ModulesRouterMapper, IFeatureModuleRouter } from '../../modules/modules-router-mapper'

export class RouterModuleFactory {
   private routerModulesMap: Array<IModuleEndpointMap> = []

   constructor() {
      this.bootStrapModules(new ModulesRouterMapper())
   }

   private bootStrapModules(routerModuleMaper: ModulesRouterMapper) {
      this.routerModulesMap = routerModuleMaper
         .registeredModules.map(this.createModules.bind(this))

   }

   private createModules(registeredModule: IFeatureModuleRouter) : Array<IModuleEndpointMap> {
      const { moduleName, parser } = registeredModule
      return new moduleName()[parser]()
   }

   public getRegisteredModules() {
      return this.routerModulesMap.map((routerModule: IModuleEndpointMap) => {
         const moduleName: string = Object.keys(routerModule)[0]
         return routerModule[moduleName]
      })
   }
}