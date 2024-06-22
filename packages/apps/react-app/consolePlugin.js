
const generate = require('@babel/generator').default;

const consolePlugin = function ({types}) {
  return {
    visitor: {
      CallExpression(path, state){
        const name =  generate(path.node.callee).code;
        if(['console.log','console.warn','console.error'].includes(name)){
          const {line, column} = path.node.loc.start;
          const location = types.stringLiteral(`${line}:${column}: `)
          path.node.arguments.unshift(location)
        }
      }
    }
  }  
}

module.exports = consolePlugin