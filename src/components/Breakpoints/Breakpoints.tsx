import React, { ReactText } from 'react'
import styled from 'styled-components'

import { theme } from '@styles/theme'
import mediaqueries from '@styles/media'

function Breakpoints() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Container largest={theme.breakpoints[theme.breakpoints.length - 1][0]}>
      {theme.breakpoints.map((brekapoint, index) => {
        return (
          <ShowBreakpoint
            breakpoint={brekapoint[0]}
            key={brekapoint[0]}
            style={{ zIndex: theme.breakpoints.length - index }}
          >
            <span>{brekapoint[0]}</span> · <span>{brekapoint[1]}px</span>
          </ShowBreakpoint>
        )
      })}
    </Container>
  )
}

export default Breakpoints

const Container = styled.div<{ largest: ReactText }>`
  position: fixed;
  bottom: 16px;
  right: 16px;
  background: ${p => p.theme.colors.purple};
  border-radius: 5px;
  padding: 2px 5px;
  z-index: 999999;
  width: 194px;
  height: 32px;
  opacity: 0.8;
  overflow: hidden;
  text-align: center;
  display: none;

  ${p => mediaqueries[p.largest]`
    display: block;
  `}
`

const ShowBreakpoint = styled.div<{ breakpoint: ReactText }>`
  position: absolute;
  bottom: 4px;
  left: 2px;
  width: 190px;
  white-space: nowrap;
  font-weight: 600;
  background: ${p => p.theme.colors.purple};
  color: #fff;
  display: none;

  ${p => mediaqueries[p.breakpoint]`
    display: block;
  `}
`
