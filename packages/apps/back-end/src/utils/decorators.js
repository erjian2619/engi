export const RequestMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  OPTIONS: "options",
};

export const controllers = []
export function Controller(prefix=''){
  return function(target) {
    target.prefix = prefix;
  }
}

export function RequestMapping(method, url) {
  return function(target, propKey, descriptor) {
    let path = url || `\${propKey}`
    const item = {
      path,
      method,
      handler: target[propKey],
      constructor: target.constructor,
    }
    controllers.push(item)
  };
}
