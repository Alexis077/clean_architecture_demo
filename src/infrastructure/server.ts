import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from '../config/env';

export class Server {
  private app: Express;
  
  constructor() {
    this.app = express();
    this.setupMiddleware();
  }
  
  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors());
    
    // Body parsing middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Logging middleware
    if (config.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }
  }
  
  public setRoutes(router: express.Router): void {
    this.app.use(router);
  }
  
  public start(): void {
    const port = config.port;
    
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
  
  public getApp(): Express {
    return this.app;
  }
} 