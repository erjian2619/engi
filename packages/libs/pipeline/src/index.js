
// ******************** utils *****************

// 只执行，参数不传递
// 执行流程参数不用返回
function syncFn(fns, rest){
  return fns.reduce((_,item) => item(rest),{})
}

const waterFallSyncFn = (fns) => (rest) => {
  return fns.reduce((prev,item) => item(prev),rest)
}

// 上一个返回了特定之，后续都不执行了
const boilSyncFn = (fns) => (rest) => {
  return fns.reduce((prev,item) => (prev ? item(prev) : prev), rest)
}

const asyncFn = (fns) => (rest) => new Promise((resolve, reject) => 
  fns.reduce((prev, item) => prev.then(_ => item(rest).catch(reject)), Promise.resolve())
)

const boilAsyncFn = (fns) => (rest) => new Promise((resolve, reject) => {})


// function Pa(ctx){
//   console.log(ctx, 'hello pa');
//   return { finish: ['a'] }
// }
// function Pb(ctx){
//   console.log(ctx, 'hello pb');
//   return { finish: [ ...(ctx?.finish || []),'b'] }
// }
// function Pc(ctx){
//   console.log(ctx, 'hello pc');
//   return { finish: [ ...(ctx?.finish || []),'c'] }
// }

// const newPipe = waterFallSyncFn([Pa, Pb, Pc])({})