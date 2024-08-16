/**App.ts */
import * as express from "express"
import * as dotenv from "dotenv"

import ApplicationConfig from "./application.routes"
import  Config  from "./config"

dotenv.config()
const PORT=Config.server.port

class App{
    app:express.Application
    constructor(){
        this.app=express()
        this.initializeRoutes()
        this.startServer()
    }
    initializeRoutes(){
        ApplicationConfig.registerRoutes(this.app)
    }
    startServer(){
        this.app.listen(PORT,()=>{
            console.log(`Listening to Port ${PORT}`)
        })
    }
}
new App()