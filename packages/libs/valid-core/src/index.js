import { initialPlugins } from "./initialPlugins";

export const ValidCore = function () {
  this.initCore();
};

ValidCore.prototype.initCore = function () {
  this.steps = ["stepInfo", "stepValid", "stepPost"];
  this.plugins = this.steps.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: [],
    };
  }, {});
  this.context = {
    login: [],
  };
};

ValidCore.prototype.addPlugin = function (step, cb) {
  if (this.steps.includes(step)) {
    this.plugins[step].push(cb);
  } else {
    console.error(`the step ${step} is not a valid step`);
  }
};

ValidCore.prototype.usePlugin = function (step, pluginName, ...params) {
  if (this.steps.includes(step)) {
    if (initialPlugins[pluginName]) {
      this.plugins[step].push((ctx) =>
        initialPlugins[pluginName](ctx, ...params),
      );
    } else {
      console.error(
        `the pluginName ${pluginName} is not a valid initialPlugin name`,
      );
    }
  } else {
    console.error(`the step ${step} is not a valid step`);
  }
};

ValidCore.prototype.rePipe = function (steps) {
  this.steps = steps;
};

ValidCore.prototype.__run = function (curStep) {
  this.context.current = {
    login: {},
  };
  (curStep || this.steps)
    .reduce((prev, cur) => {
      return [...prev, this.plugins[cur]];
    }, [])
    .reduce((proChain, proCur) => {
      return proChain.then((res) => {
        return proCur(res);
      });
    }, Promise.resolve(this.context));
};

ValidCore.prototype.runWidthStep = function (curStep) {
  return this._run(curStep);
};

ValidCore.prototype.run = function (curStep) {
  return this.__run();
};
