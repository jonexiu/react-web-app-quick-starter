/* eslint-disable no-param-reassign */
import axios from 'axios'

import { OSS_URL, SITE_DESC, SITE_TITLE, WX_SIGN_URL } from './constants'

let resizeTimeout
export function resizeThrottler(cb) {
  function actualResizeHandler() {
    const viewW = window.innerWidth
    const viewH = window.innerHeight
    cb(viewW, viewH)
  }
  // ignore resize events as long as an
  // actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      actualResizeHandler()
    }, 200)
  }
}

const agent = window.navigator.userAgent.toLowerCase()

export const isWechat = () => /micromessenger/i.test(agent)

export const getWxSignature = async (url = window.location.href) => {
  try {
    const res = await axios({
      url: WX_SIGN_URL,
      data: { url },
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const { appId, timestamp, nonceStr, signature } = res.data
    // 开始配置微信JS-SDK
    return wx.config({
      // debug: true,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ]
    })
  } catch (err) {
    return console.log(err)
  }
}

export const genHelmetData = ({
  imageUrl = `${OSS_URL}/icons/icon-620x620.png`,
  type = 'article',
  url = window.location.href,
  title = SITE_TITLE,
  desc = SITE_DESC
}) => ({
  title,
  meta: [
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    {
      property: 'og:image',
      content: `${imageUrl}?x-oss-process=style/share`
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: desc
    }
  ]
})

const defaultShare = {
  link: window.location.href,
  title: SITE_TITLE,
  imgUrl: `${OSS_URL}/images/share-icon.png`,
  desc: SITE_DESC,
  timeline: SITE_DESC
}

export function setShareContent(params) {
  const {
    link: _l,
    title: _t,
    imgUrl: _i,
    desc: _d,
    timeline: _tl
  } = defaultShare
  const title = (params && params.title) || _t
  const link = (params && params.link) || _l
  const imgUrl = `https:${(params && params.imgUrl) || _i}`
  const timeline = (params && params.timeline) || _tl
  const desc = (params && params.desc) || _d

  if (isWechat()) {
    document.title = title
    wx.ready(() => {
      wx.onMenuShareTimeline({ title: timeline, imgUrl, link })
      wx.onMenuShareAppMessage({ title, imgUrl, link, desc })
    })
  }

  return genHelmetData({
    imageUrl: imgUrl,
    title,
    url: link,
    desc
  })
}

export const initApp = setSizes => {
  window.addEventListener(
    'resize',
    () =>
      resizeThrottler((winW, winH) =>
        setSizes({ winW, winH, imageScale: winW / 1000 })
      ),
    {
      capture: true,
      passive: true
    }
  )

  if (isWechat()) {
    getWxSignature(window.location.href)
    setShareContent()
  }
}

export const getPixelRatio = context => {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1

  return (window.devicePixelRatio || 1) / backingStore
}

export function randomString(len) {
  const _len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < _len; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

// function getRandomArbitrary(min, max) {
//   return (Math.random() * (max - min)) + min;
// }

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const posOrNeg = num => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    return -num
  }
  return num
}

export const safeBottomArea = () => {
  const { height } = window.screen
  if ((height === 812 || height === 896) && window.devicePixelRatio > 1) {
    return 20
  }
  return 0
}
