/* eslint-disable: max-len */
import { hot } from 'react-hot-loader/root'
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import * as metadata from './metadata'

/* app */
import App from './App'

/* global-styles */
import GlobalStyle from './helpers/globalStyle'

/* utils */
import { genHelmetData } from './helpers/utils'

const AppWrapper = () => (
  <Fragment>
    <Helmet
      title={genHelmetData({}).title}
      meta={[...metadata.meta, ...genHelmetData({}).meta]}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />
    <App />
    <GlobalStyle />
  </Fragment>
)

export default hot(AppWrapper)
