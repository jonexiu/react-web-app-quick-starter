/* eslint-disable: max-len */
import { hot } from 'react-hot-loader/root'
import React, { useState, useEffect } from 'react'

/* pages */

/* components */

/* utils */
import { initApp } from './helpers/utils'

/* data */
import Context from './helpers/context'

const App = () => {
  const { innerWidth: winW, innerHeight: winH } = window
  const [sizes, setSizes] = useState({ winW, winH })

  useEffect(() => {
    initApp(setSizes)
  }, [])

  return (
    <Context.Provider value={{ sizes }}>
      <div>Hello</div>
    </Context.Provider>
  )
}

export default hot(App)
