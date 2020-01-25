/* eslint-disable: max-len */
import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'

/* pages */

/* components */

/* utils */
import { initApp } from './helpers/utils'

/* data */
import Context from './helpers/context'

const App = () => {
  useEffect(() => {
    initApp()
  }, [])
  return (
    <Context.Provider value={{}}>
      <div />
    </Context.Provider>
  )
}

export default hot(App)
