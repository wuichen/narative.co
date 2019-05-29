import React from 'react'
import styled from 'styled-components'
import { useReduxState } from '../../store'

function LayoutBlur({ children }: { children: Element[] }) {
  const [{ shortcuts }] = useReduxState(state => ({
    shortcuts: state.shortcuts,
  }))

  const open = shortcuts.name && shortcuts.name.includes('COMMAND_LINE')
  const styles = open
    ? { background: 'rgba(8, 8, 11, 0.05)', filter: 'blur(4px)' }
    : {}

  return <BlurContainer style={styles}>{children}</BlurContainer>
}

export default LayoutBlur

const BlurContainer = styled.div`
  will-change: background, filter;
  transition: background 100ms, filter 100ms;
`
