import Koa from "koa";

import Router from "koa-router";
const app = new Koa();

import ControllerClass from "./controllers/index";

import { controllers } from "./utils/decorators";

const router = new Router();

// cors
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-hHeader", "*");
  ctx.set("Access-Control-Allow-Methods", "*");
  ctx.set("Content-type", "application/json;charset-utf8");
  if (ctx.request.method.toLocaleLowerCase() === "options") {
    ctx.status = 200;
  } else {
    await next();
  }
});

// const COMMON_API = '\api'

controllers.forEach((item, index) => {
  let { method, path, handler, constructor } = item;

  const { prefix } = constructor;

  if (prefix) path = `${prefix}${path}`;
  console.log(`${index+1}====`, `${method}:${path}`);
  router[method](path, handler);
});

app.use(router.routes());

app.listen(5005, () => {
  console.log("5005 is listening");
});
