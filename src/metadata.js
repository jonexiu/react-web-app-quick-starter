/* eslint-disable max-len */
import { SITE_TITLE, SITE_DESC, ICON_PATH } from './helpers/constants'

export const meta = [
  {
    charset: 'UTF-8'
  },
  {
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no'
  },
  {
    httpEquiv: 'X-UA-Compatible',
    content: 'IE=edge'
  },
  {
    name: 'description',
    content: SITE_DESC
  },
  {
    name: 'theme-color',
    content: '#FFFFFF'
  },
  {
    name: 'mobile-web-app-capable',
    content: 'yes'
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  },
  {
    name: 'apple-mobile-web-app-title',
    content: SITE_TITLE
  },
  {
    name: 'full-screen',
    content: 'yes'
  },
  {
    name: 'renderer',
    content: 'webkit|ie-comp|ie-stand'
  }
]

export const link = [
  {
    rel: 'shortcut icon',
    type: 'image/png',
    href: `${ICON_PATH}/favicon-32x32.png`,
    size: '32x32'
  },
  // {
  //   rel: 'manifest',
  //   href: `${OSS_URL}/manifest.json`
  // },
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: `${ICON_PATH}/apple-icon-57x57.png`
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: `${ICON_PATH}/apple-icon-72x72.png`
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: `${ICON_PATH}/apple-icon-114x114.png`
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: `${ICON_PATH}/apple-icon-144x144.png`
  }
]

export const script = []

export const noscript = []
