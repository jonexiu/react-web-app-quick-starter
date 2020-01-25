import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'

import AppWrapper from './AppWrapper'

const { render, hydrate } = ReactDOM
const { NODE_ENV } = process.env
const domFunction = NODE_ENV === 'development' ? render : hydrate

window.onload = () =>
  Loadable.preloadReady().then(() =>
    domFunction(<AppWrapper />, document.getElementById('root'))
  )
