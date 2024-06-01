import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

type Props = {
  onChange?: (bool: boolean) => void;
}

const tabs = [
  {name: '关注', to: '/follow'},
  {name: '推荐', to: '/'},
  {name: '热榜', to: '/hot'},
  {name: '赤贫', to: '/video'},
]

const PureTab = () => tabs.map((item) => <NavLink key={item.name} to={item.to} className={({isActive}) => (' whitespace-nowrap p-4 text-base translate-all') + (
  isActive ? ' text-blue-600 font-bold' : 'text-black hover:text-blue-900'
)}>
  {item.name}
</NavLink>)

const Tabs = ({onChange}: Props) => {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      console.log('observer', entries?.[0]?.isIntersecting)
      onChange && onChange(entries?.[0]?.isIntersecting)
    })
    return () => {
      scrollRef.current && intersectionObserver.unobserve(scrollRef.current)
    }
  })

  return (
    <div className='w-full'>
      <div ref={scrollRef}></div>
      <div className='flex'>
        <PureTab />
      </div>
      <Outlet />
    </div>
  )
}

export default Tabs