import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp } from '@foal/core';


// App
import { AppController } from './app/app.controller';
import {
  Database,
  LoggerService
} from './app/services';

async function main() {
  const logger = new LoggerService();
  const app = createApp(AppController);
  await Database.init();
  const httpServer = http.createServer(app);
  const port = Config.get2('port', 'number', 3001);
  httpServer.listen(port, () => {
    logger.info_init(`Listening on port ${port}...`);
  });
}

main()
  .catch(err => { console.error(err); process.exit(1); });
