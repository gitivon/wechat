"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
let port;
switch (process.env.NODE_ENV) {
    default:
        port = 80;
        break;
    case 'dev':
        port = 4000;
        break;
}
routing_controllers_1.useContainer(typedi_1.Container);
const app = new Koa();
app.use(bodyParser());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(`${ctx.request.method} ${ctx.request.path}`);
    return yield next();
}));
routing_controllers_1.useKoaServer(app, {
    classTransformer: true,
    // defaultErrorHandler: false,
    cors: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'sit',
    controllers: [__dirname + '/controllers/**/*{.js,.ts}'],
    middlewares: [__dirname + '/middlewares/**/*{.js,.ts}'],
});
app.listen(port);
console.log(`app running on port: ${port}`);
exports.default = app;
//# sourceMappingURL=app.js.map