
interface TrackData{
  seqId: number;
  id:string;
  timestamp:number;
  msg?:string;
  eventName:string;
}

export interface UserTrackData {
  msg?:string;
  eventName:string;
}

export class BaseTrack{
  private seq = 0;

  public track(data: UserTrackData){
    // this.addTask({
    //   id: `${Math.random()}`,
    //   seqId: this.seq++,
    //   timestamp: Date.now(),
    //   ...data
    // })
  }

  protected comsumeTaskQueue(data:Array<TrackData>):Promise<unknown>{
    return new Promise((resolve,reject)=>{

      // 1px gif方案
      // const image =  new Image();
      // image.src =`https://www.track.com/logs.gif?data=${JSON.stringify(data)}`
      // image.onload = ()=>{
      //   resolve(true)
      // }

      setTimeout(() => {

      })

    })
  }
}