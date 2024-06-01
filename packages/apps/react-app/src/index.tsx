import {createRoot} from 'react-dom/client'
import React from 'react'
import App from './app'
import './index.less'

const app = createRoot(document.getElementById('root') as Element)

app.render(<App />)
