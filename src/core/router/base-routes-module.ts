import { Request, Response } from 'express'

export interface IModuleEndpointMap {
   [key: string]: IHttpVerbMap
}

export interface IHttpVerbMap {
   get?: Array<IFeatureModuleRouterInfo>,
   post?: Array<IFeatureModuleRouterInfo>,
   put?: Array<IFeatureModuleRouterInfo>,
   pacth?: Array<IFeatureModuleRouterInfo>,
   delete?: Array<IFeatureModuleRouterInfo>
}

export interface IFeatureModuleRouterInfo {
   endpoint: string,
   callback: Function,
   isProtected: boolean   

}
export class BaseRouterModule {
   protected readonly context: string = '/api'
   protected version: string = 'v1'
   protected moduleName: string = 'rest-api'

   constructor(moduleName: string) {
      if(typeof moduleName === 'string') {
         this.moduleName = moduleName
      }
   }

   protected MODULES_ENDPOINT_MAP: IModuleEndpointMap = {
      [this.moduleName]: {
         get: [
            {
               endpoint: `${ this.context }/${ this.version }/${ this.moduleName }`,
               callback: (req: Request, res: Response) => {
                  res.sendStatus(200).send({ status: 200, msg: 'OK' })
               },
               isProtected: false
            }
         ]
      }
   }

   public getRoutesFromModules(): IModuleEndpointMap{
      return this.MODULES_ENDPOINT_MAP
   }
}