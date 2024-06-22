import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";


interface MyAxiosRequestConfig extends InternalAxiosRequestConfig{
  requestKey?: string
}

type EventProps = {
  [key: string]: any
}

class EventEmitter{
  events: EventProps
  constructor(){
    this.events = {}
  }

  on(key: string, cbRes: any, cbRej: any){
    this.events[key] = (this.events[key] || []).concat([{cbRes, cbRej}])
  }

  emit(key: string, cbType: 'cbRes' | 'cbRej', res: any){
    if(this.events[key]){
      this.events[key].forEach((cb: any) => {
        cb[cbType](res)
      })
    }
  }

  off(key:string){
    if(this.events[key])delete this.events[key]
  }
}

function getReqKey(config:InternalAxiosRequestConfig){
  const { method='get', url, data, headers } = config;
  return [method, url, JSON.stringify(data), JSON.stringify(headers)].join('&')
}

const reqKeyArr = new Set()
const eventEmitter = new EventEmitter()

axios.interceptors.request.use( async function(config: MyAxiosRequestConfig):Promise<any>{
  const curKey = getReqKey(config);

  if(reqKeyArr.has(curKey)){
    const res = await new Promise((resolve, reject) => {
      eventEmitter.on(curKey, resolve, reject)
    })
    return Promise.reject({
      status: 'limitReqSuccess',
      res
    })
  }else{
    config.requestKey = curKey;
    reqKeyArr.add(curKey)
    return config
  }
})

axios.interceptors.response.use(async function(response: AxiosResponse): Promise<any>{

})