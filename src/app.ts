import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from './shared/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as path from 'path';

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initMiddlewares();
    this.initErrorHandlers();
    this.initControllers(controllers);
    this.initClient();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('tiny'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initErrorHandlers() {
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }

  private initClient() {
    console.log(path.join(__dirname + '/../client/'));
    this.app.get('/', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname + '/../client/index.html'));
    });
  }
}

export default App;
