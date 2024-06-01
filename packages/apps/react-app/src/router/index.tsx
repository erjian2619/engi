import React from "react";
import { Outlet, RouteObject } from "react-router";
import Home from "../pages/home";
import RecommendList from "../pages/home/tabs/recommendList";

export interface ExtraBizObject{
  title?: string
}

export type BARouter = RouteObject & ExtraBizObject

export const router: Array<BARouter> = [
  {
    path: '/',
    title: '首页',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <RecommendList />
      },
      {
        path: '/follow',
        element: <div>灌注</div>
      },
      {
        path: '/hot',
        element: <div>热榜</div>
      },
      {
        path: '/video',
        element: <div>视频</div>
      },
    ]
  },
  {
    path: '/edu',
    title: '学堂',
    element: <div>学堂</div>
  },
  {
    path: '/explore',
    title: '发现',
    element: <div>发现</div>
  },
  {
    path: '/question',
    title: '问题',
    element: <div>问题</div>
  },
]