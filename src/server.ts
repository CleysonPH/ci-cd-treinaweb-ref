import { app } from './app';
import { env } from './config/env';

app
  .listen({ port: env.PORT })
  .then(() => console.log(`🚀 Server is listening on port ${ env.PORT }`));
