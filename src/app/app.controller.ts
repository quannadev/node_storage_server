import { controller } from '@foal/core';

import {ApiController, AuthController} from './controllers';

export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/auth', AuthController),
  ];
}
