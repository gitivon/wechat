import "reflect-metadata";
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser'
import { Container } from 'typedi';
import { useKoaServer, useContainer } from 'routing-controllers';

const port = 4000;

useContainer(Container);
const app = new Koa();
app.use(bodyParser())
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.path}`);
  return await next()
});
useKoaServer(app, {
  classTransformer: true,
  // defaultErrorHandler: false,
  cors: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'sit',
  controllers: [__dirname + '/controllers/**/*{.js,.ts}'],
  middlewares: [__dirname + '/middlewares/**/*{.js,.ts}'],
});

app.listen(port);
console.log(`app running on port: ${port}`)
export default app;