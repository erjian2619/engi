

const CreateStore = function(opts={}){
  this.unLocal = opts.unLocal;
  this.shouldFetch = opts.shouldFetch;
  this.maxLength = opts.maxLength || 30;
  this.expireTime = opts.expireTime || NaN;
  this.plugins = opts.plugins || []
  this.now = Date.now()
  this.observe()
}

CreateStore.prototype.observe =function(){
  const that = this
  this.__mock__storage = new Proxy({}, {
    set: function(target, key, value, receiver){
      let _value = value;
      // 劫持一下数据， 又有可能有其他选项
      if(value instanceof Array && value.length > that.maxLength){
        _value = value.slice(0, that.maxLength)
      }

      if(that.expireTime && that.expireTime + that.now() < Date.now()){

      }

      if(that.shouldFetch){

      }

      if(!that.unLocal){
        // 要存本地
        that.setItem(key, _value)
      }
      return Reflect.set(target, key, _value, receiver)
    },
    get: function(target, key, receiver){
      let result;
      if(!that.unLocal){
        result = (that.getItem() || Reflect.get(target, key, receiver))
      }else{
        result = Reflect.get(target, key, receiver)
      }
      return result
    }
  })
}

CreateStore.prototype.getItem = function(type){
  let data;
  try{
    data = window[this.storageMethod].getItem(type)
  } catch(error){
    console.error('no window', error);
  }

  let dataJson;
  try {
    dataJson = JSON.parse(data)
  } catch (error) {
    console.error(error);
  }
  return dataJson
}
CreateStore.prototype.setItem = function(type, data){
  const dataJson = JSON.stringify(data);
  try{
    data = window[this.storageMethod].setItem(dataJson)
  } catch(error){
    console.error(error);
  }
}

// 对外的api
CreateStore.prototype.get = function(type){
  return this.__mock__storage[type]
}

CreateStore.prototype.set = function(type, data){
  this.__mock__storage[type] = data
}

const methodArr = ['pop','push','unshift','shift','reserve', 'splice', 'sort']

methodArr.forEach((method) => {
  CreateStore.prototype[method] = function (type, ...rest){
    if(!this.get(type)){
      this.set(type, [])
    }

    if(!(this.get(type) instanceof Array)){
      throw new Error('must be Array')
    }

    const dataList = this.get(type)
    Array.prototype[method].apply(dataList, rest)
    this.set(type, dataList)
  }
})


const CreateLocalStore = function (...rest) {
  CreateStore.apply(this,rest)
  this.storageMethod = 'localStorage'
}

CreateLocalStore.prototype = Object.create(CreateStore.prototype)
CreateLocalStore.prototype.constructor = CreateLocalStore

const CreateSessionStore = function (...rest) {
  CreateStore.apply(this, rest)
  this.storageMethod = 'sessionStorage'
}

CreateSessionStore.prototype = Object.create(CreateStore.prototype)
CreateSessionStore.prototype.constructor = CreateSessionStore

module.exports = {
  CreateLocalStore,
  CreateSessionStore
}