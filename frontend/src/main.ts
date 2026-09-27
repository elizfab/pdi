import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Pdi } from './app/pdi';

bootstrapApplication(Pdi, appConfig)
  .catch((err) => console.error(err));
