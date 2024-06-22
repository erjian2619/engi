import { debounce } from "lodash";

interface RequiredData {
  timestamp: number;
}

// 有残留数据没上报，还有数据，关了浏览器
/**
 * 用浏览器存储上报数据
 */

class TaskQueueStorableHelper<T extends RequiredData> {
  private static instance: TaskQueueStorableHelper<any> | null = null;

  private __queue: T[] = [];

  private STORAGE_KEY = "__track_queue";
  // 单例
  public getInstance<T extends RequiredData>() {
    if (!this.instance) {
      this.instance = new TaskQueueStorableHelper<T>();
    }
    return this.instance;
  }

  get queue() {
    return this.__queue;
  }

  set queue(value: T[]) {
    this.__queue = (this.__queue || []).concat(value);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.__queue));
  }
}

export abstract class AsyncTrackQueue<T> {
  private __queue: T[] = [];

  private set queue(value: T[]) {
    this.__queue = value;
    if (value.length) {
    }
  }

  public add(item: T): void {
    this.queue.push(item);
  }

  protected debounceRun = debounce(this.run.bind(this), 500);

  private run() {}
}
