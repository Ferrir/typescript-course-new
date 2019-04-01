import * as http from 'http'
import { CoreModule } from '../core/core'
const { serverPort } = require('../config/env')

export class Server {

   private db
   private express

   constructor() {
      this.express = new CoreModule().express
      this.upServer() 
      // if(dbConnector) {
      //    if(dbConnector) {
      //       this.db = dbConnector
      //       this.express = new CoreModule().express
      //       this.syncDB()
      //    }
      // }
   }

   private async syncDB() {
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
      console.log(`Can't connect to a database because ${ error }`)
      this.upServer()
   }

   private upServer() {
      http
         .createServer(this.express)
         .listen(serverPort)
         .on('listening', this.onServerUp.bind(this))
         .on('error', this.onServerStartupError.bind(this))
   }

   private onServerUp(port: number) {
      console.log(`Server is running on port ${ port }`)
   }

   private onServerStartupError(error: NodeJS.ErrnoException) {
      console.log(`ERROR ${ error }`)
   }

   private logDbConnection( { models, options, config }) {
      const { dialect, host } = options
      const { database, port } = config

      if(dialect && host && database && port && models) {
         console.log(`Database Dialect ${ dialect }`)
         console.log(`Database Host ${ host }`)
         console.log(`Database Name ${ database }`)
         console.log(`Database Port ${ port }`)
         console.log(`Created Tables ${ models }`)
      }
   }
}