import * as http from 'http'
import { CoreModule } from '../core/core'
const { serverPort } = require('../config/env')

export class Server {

   private db
   private express

   constructor() {
      if(dbConnector) {
         if(dbConnector) {
            this.db = dbConnector
            this.express = new CoreModule().express
            this.syncDB()
         }
      }
   }

   private async sysncDataBase() {
      try {
         const syncData = await this.db.sync()
         this.dbSyncHandler(syncData)
      } catch (error) {
         this.dbSyncErrorHandler(error)
      }
   }

   private dbSyncHandler(dbInfo) {      
      const { options, config, modelManager } = dbInfo
      const { models } = modelManager
      this.upServer()
      this.logDbConnection
   }

   private dbSyncErrorHandler(error) {
      console.log(`Não foi possível conectar a database ${ error }`)
   }

   private upServer() {
      http
         .createServer(this.express)
         .listen(serverPort)
         .on('listening', this.onServerUP.bind(this))
         .on('error', () => {})
   }
}