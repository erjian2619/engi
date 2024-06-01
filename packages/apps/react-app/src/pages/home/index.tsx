import React, { useState } from 'react'
import Navigation from '../../components/navigation'
import Card from '../../components/card'
import Tabs from './tabs'

export default function Home() {

  const [hide, setHide] = useState<boolean>(false)

  return (
    <div className='bg-slate-100 overflow-hidden'>
      <Navigation hide={hide} />
      <div className='mx-auto max-w-5xl flex px-2 my-2 box-border'>
        <Card className='w-5/7 '>
          <Tabs onChange={setHide} />
        </Card>
        <div className='w-2/7 flex flex-col flex-1'>
          <Card className='w-full'>
            创作中共新
          </Card>
          <Card className='w-full'>
            推荐
          </Card>
          <Card className='w-full'>
            收藏
          </Card>
        </div>
      </div>
    </div>
  )
}
