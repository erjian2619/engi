import axios from "axios";

const inst = axios.create()

inst.interceptors.response.use(resp => resp.data)

const COMMON_URL = 'https://localhost:3010/api'

export interface FeedOpts {
  url: string;
  startNum: number;
  pageSize: number
}

export const apiGet = (opts:FeedOpts) => {
  return inst<any, any>({
    method: 'GET',
    url: `${COMMON_URL}/${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`
  })
}

// export const apiPost = ()