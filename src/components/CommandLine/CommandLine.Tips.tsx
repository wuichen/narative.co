import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useReduxState } from '../../store'
import { constants, keyToSymbol } from '../../shortcuts'

function CommandLineTips() {
  const [active, setActive] = useState(false)
  const [{ shortcuts }] = useReduxState(state => ({
    shortcuts: state.shortcuts,
  }))

  useEffect(() => {
    if (
      shortcuts.source === constants.COMMAND_LINE &&
      shortcuts.name !== constants.GO_TO_ARTICLE
    ) {
      setActive(true)

      setTimeout(() => {
        setActive(false)
      }, 6000)
    }
  }, [shortcuts.name])

  const destination =
    shortcuts.name &&
    shortcuts.name
      .split('_')
      .join(' ')
      .toLowerCase()

  return (
    <Frame showToolTip={active}>
      <TipsContainer>
        Next time hit,{' '}
        <SymbolContainer>
          {shortcuts.keys &&
            shortcuts.keys.map((key: any) => {
              let symbol = keyToSymbol(key)
              if (typeof symbol === 'function') symbol = symbol()

              return <Symbol key={key}>{symbol}</Symbol>
            })}{' '}
        </SymbolContainer>
        to {destination} faster
      </TipsContainer>
    </Frame>
  )
}

export default CommandLineTips

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;

  opacity: ${p => (p.showToolTip ? 1 : 0)};
  transform: ${p =>
    p.showToolTip
      ? 'translate3d(0,0,0) scale(1)'
      : 'translate3d(0px, 15px, -8px) scale(0.95)'};
  transition: opacity 0.33s 0.2s, transform 0.33s var(--ease-out-quad) 0.2s;
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
