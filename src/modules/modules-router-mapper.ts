import { AuthRouterModule } from "./auth/auth-router";

export interface IFeatureModuleRouter{
   moduleName: any,
   parser: string   
}
export class ModulesRouterMapper {
   public registeredModules: Array<IFeatureModuleRouter> = [{
      moduleName: AuthRouterModule,
      parser: 'getRoutesFromModules'   
   }]
}