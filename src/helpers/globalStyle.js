import React from 'react'
import { Global, css } from '@emotion/core'
import { FONTS, FONT_PATH } from './constants'

const iconFont = `${FONT_PATH}/icons2.woff`

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      html,
      body {
        font-family: ${FONTS.BODY};
        margin: 0;
        padding: 0;
        background: #fff;
        width: 100vw;
      }
      a,
      a:visited {
        text-decoration: none;
        color: inherit;
      }
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
      }
      button {
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        outline: 0;
      }

      i[class^='icon-']:before,
      i[class*=' icon-']:before {
        font-family: 'Icons' !important;
        font-style: normal;
        font-weight: normal !important;
        font-variant: normal;
        text-transform: none;
        line-height: 1 !important;
        width: 1em;
        height: 1em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .clamp-text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hover-label {
        border: 1px solid #000;
        background: #fff;
        align-self: auto;
        margin: auto;
        padding: 8px;
        width: 200px;
        text-align: center;
        opacity: 0;
        @extend .mono;
      }
      .clearfix() {
        &:after {
          display: block;
          content: '';
          clear: both;
        }
      }
      @font-face {
        font-family: 'Icons';
        src: url(${iconFont}) format('woff');
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
)

export default GlobalStyle
