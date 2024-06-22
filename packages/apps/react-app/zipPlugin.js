const JSZip = require("jszip");
const { RawSource } = require('webpack-sources')

/**
 * 在 webpack 最后输出产物之前，把文件压缩，一起输出
 */
class ZipPlugin {
  constructor(options){
    this.options = options
  }

  // tapabel
  apply(compiler){
    let context = this;
    compiler.hooks.emit.tapAsync('zipPlugin', (compilation, callback) => {
      const assets = compilation.assets;

      const zip = new JSZip

      // emit 为生成代码阶段，能拿到所有待生成文件
      Object.keys(assets).forEach((filename) => {
        const source = assets[filename].source()
        zip.file(filename, source)
      });

      zip.generateAsync({type: 'nodebuffer'}).then(res => {
        compilation.assets[context.options.filename] = new RawSource(res);
        callback()
      })
    })
  }
}

module.exports = ZipPlugin