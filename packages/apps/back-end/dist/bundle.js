(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('koa'), require('koa-router'), require('core-js/modules/es.array.push.js')) :
  typeof define === 'function' && define.amd ? define(['koa', 'koa-router', 'core-js/modules/es.array.push.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Koa, global.Router));
})(this, (function (Koa, Router) { 'use strict';

  const RequestMethod = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options"
  };
  const controllers = [];
  function Controller(prefix = '') {
    return function (target) {
      target.prefix = prefix;
    };
  }
  function RequestMapping(method, url) {
    return function (target, propKey, descriptor) {
      let path = url || `\${propKey}`;
      const item = {
        path,
        method,
        handler: target[propKey],
        constructor: target.constructor
      };
      controllers.push(item);
    };
  }

  var _dec$1, _dec2$1, _class$1, _class2$1;
  function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let BookController = (_dec$1 = Controller("/book"), _dec2$1 = RequestMapping(RequestMethod.GET, "/all"), _dec$1(_class$1 = (_class2$1 = class BookController {
    async getAllBooks(ctx) {
      console.log("getAllBooks");
      await setTimeout(() => {}, 500);
      ctx.body = {
        books: [{
          id: 1,
          name: 'book1'
        }]
      };
    }
  }, (_applyDecoratedDescriptor$1(_class2$1.prototype, "getAllBooks", [_dec2$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "getAllBooks"), _class2$1.prototype)), _class2$1)) || _class$1);

  var _dec, _dec2, _dec3, _dec4, _class, _class2;
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let UserController = (_dec = Controller('/user'), _dec2 = RequestMapping(RequestMethod.GET, "/all"), _dec3 = RequestMapping(RequestMethod.GET, "/:id"), _dec4 = RequestMapping(RequestMethod.POST, "/"), _dec(_class = (_class2 = class UserController {
    async getAllUsers() {
      return "get all users";
    }
    async getUserById() {
      return "get user by id";
    }
    async createUser() {
      return "create user";
    }
  }, (_applyDecoratedDescriptor(_class2.prototype, "getAllUsers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllUsers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUserById", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getUserById"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createUser", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "createUser"), _class2.prototype)), _class2)) || _class);

  var index = {
    BookController,
    UserController
  };

  const app = new Koa();
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
    let {
      method,
      path,
      handler,
      constructor
    } = item;
    const {
      prefix
    } = constructor;
    if (prefix) path = `${prefix}${path}`;
    console.log(`${index + 1}====`, `${method}:${path}`);
    router[method](path, handler);
  });
  app.use(router.routes());
  app.listen(5005, () => {
    console.log("5005 is lin");
  });

}));
