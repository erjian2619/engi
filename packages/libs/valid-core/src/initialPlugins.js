
// 标准的 plugin
// plugin, 是core 开发者顶
/**
 * 所有 plugin ,必须是 promise 形式
 * @param {*} ctx 上下文
 * @param {*} match 插件可选参数，使用特定插件传入
 * @returns 
 */
const phoneValidPlugin = (ctx, match) => {
  return new Promise((resolve) => {
    ctx.login.push(`手机号按照${match}校验`);
    resolve(ctx)
  })
}

const postUrlPlugin = (ctx, url) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      ctx.login.push('提交完成');
      resolve(ctx)
    },1000)
  })
}


export const initialPlugins = {
  phoneValidPlugin,
  postUrlPlugin
}