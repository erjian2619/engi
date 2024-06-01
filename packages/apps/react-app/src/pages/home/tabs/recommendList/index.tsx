import React, { FC, ReactEventHandler, RefObject, useEffect, useRef, useState } from "react";
import { mockList } from "./mockList";

type Props = {};

interface ItemProps {
  item: any;
}

const RecommendData: FC<ItemProps> = ({ item }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = (e) => {
    e?.preventDefault()
    setSelected(true)
  }
  const href =
    item?.target?.type === "answer"
      ? `https://www.zhihu.com/answer/${item?.target?.question?.id}/answer/${item?.target?.id}`
      : "";
  return (
    <div className="flex flex-col items-start p-4 border-b">
      {/* 标题 */}
      <div className="h-auto flex justify-start">
        <a
          target="_blank"
          href={href}
          className="font-bold text-black text-lg leading-10"
        >
          {item?.target?.question?.title}
        </a>
      </div>
      {/* 文章内容 */}
      <div>
        {selected ? (
          <div dangerouslySetInnerHTML={{ __html: item?.target?.content }}></div>
        ) : (
          <a
            href="/"
            onClick={handleClick}
            className=" cursor-pointer text-slate-800 hover:text-slate-500"
          >
            {item?.target?.excerpt || item?.target?.excerpt_new}
            <span className="text-sm leading-7 text-blue-500 hover:text-slate-500">
              阅读全文 &gt;
            </span>
          </a>
        )}
      </div>
      {/* 底部 bar */}
      <div
        className={`flex bg-white w-full ${selected ? " bottom-0 sticky" : ""}`}
      >
        <div className="h-10 rounded-md bg-blue-100 p-2 m-2 inline-flex">
          <span className=" inline-flex text-blue-500 items-center text-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            &nbsp;赞同
          </span>
        </div>
      </div>
    </div>
  );
};

export default function RecommendList({}: Props) {
  return (
    <div className="flex flex-col border-t">
      {mockList.map((item: any, idx: number) => (
        <RecommendData key={item.id} item={item} />
      ))}
    </div>
  );
}


// use Api
// useEffect 型
// effect 是副作用，要把那些东西作为附着用
// entries?.[0]?.isIntersecting
const useRefInsObsEffect = (fn: (b:boolean) => void, ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      fn(entries?.[0]?.isIntersecting)
    })
    ref.current && observer.observe(ref.current)
    return () => {
      ref.current && observer.unobserve(ref.current)
    }
  }, [])
}

const useRefInsObsState = (ref: RefObject<HTMLDivElement>) => {
  const [list, setList] = useState([])
  const lockRef = useRef(true)
  const listRef = useRef([])
  const [loading, setLoading] = useState(false)

  useRefInsObsEffect((b) => {
    if(ref && lockRef.current){
      setLoading(false)
    }
  }, ref)
  return [list, loading]
}
