import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useReduxState } from '../../store'
import { constants, keyToSymbol } from '../../shortcuts'
import { startAnimation } from '@utils'

const whitelist = [
  constants.GO_TO_ARTICLES,
  constants.GO_TO_LABS,
  constants.GO_TO_CAREERS,
  constants.GO_TO_HOME,
]

function shortcutToText({ name }) {
  if (name) {
    return name
      .split('_')
      .join(' ')
      .toLowerCase()
  }
}

function shortcutToSymbols({ keys }) {
  if (keys) {
    return keys.map((key: any) => {
      let symbol = keyToSymbol(key)
      if (typeof symbol === 'function') symbol = symbol()

      return <Symbol key={key}>{symbol}</Symbol>
    })
  }
}

function CommandLineTips() {
  const [active, setActive] = useState(false)
  const [hide, setHide] = useState(false)
  const [{ shortcuts }] = useReduxState(state => ({
    shortcuts: state.shortcuts,
  }))

  useEffect(() => {
    const shouldShowTip =
      whitelist.some(name => shortcuts.name === name) &&
      shortcuts.source === constants.COMMAND_LINE

    const timer = setTimeout(() => {
      setActive(false)
    }, 3000)

    if (shouldShowTip) {
      setHide(false)

      startAnimation(() => setActive(true))
    } else {
      setHide(true)
      clearTimeout(timer)
    }
  }, [shortcuts.name])

  return (
    <Frame showToolTip={active} hideToolTip={hide}>
      <TipsContainer>
        Next time hit,{' '}
        <SymbolContainer>{shortcutToSymbols(shortcuts)} </SymbolContainer>
        to {shortcutToText(shortcuts)} faster
      </TipsContainer>
    </Frame>
  )
}

export default CommandLineTips

const Frame = styled.div<{ showToolTip: boolean; hideToolTip: boolean }>`
  display: ${p => (p.hideToolTip ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;
  pointer-events: none;
  user-select: none;

  opacity: ${p => (p.showToolTip ? 1 : 0)};
  transform: ${p =>
    p.showToolTip
      ? 'translate3d(0,0,0) scale(1)'
      : 'translate3d(0px, 15px, -8px) scale(0.97)'};
  transition: opacity 0.33s linear 0.1s, all 0.33s var(--ease-out-quad) 0.1s;
`

const TipsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: rgba(29, 33, 40, 0.98);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  height: 34px;
  padding: 0 12px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
`

const SymbolContainer = styled.span`
  margin: 0 7px;
  display: flex;
`
const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 4px;
  color: ${p => p.theme.colors.bg};
  background: #fff;
  font-size: 13px;

  &:not(:last-child) {
    margin-right: 7px;
  }

  svg {
    position: absolute;
    left: 3px;
  }
`
