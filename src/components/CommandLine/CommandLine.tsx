import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import CommandLineOptions from './CommandLineOptions'
import Logo from '../Logo'
import { CloseIcon } from '../../icons/ui'
import { useReduxState } from '../../store'

interface Position {
  symbol: string
  name: string
  feature: string
  label: string
  keys: string[]
}

interface CommandLineProps {
  positions?: Position[]
}

const options = [
  {
    symbol: 'GoToIcon',
    name: 'string',
    feature: 'string',
    label: 'string',
    keys: ['g', 'a'],
  },
  {
    symbol: 'GoToIcon',
    name: 'string',
    feature: 'string',
    label: 'string',
    keys: ['g', 'a'],
  },
  {
    symbol: 'GoToIcon',
    name: 'string',
    feature: 'string',
    label: 'string',
    keys: ['g', 'a'],
  },
  {
    symbol: 'GoToIcon',
    name: 'string',
    feature: 'string',
    label: 'string',
    keys: ['g', 'a'],
  },
  {
    symbol: 'GoToIcon',
    name: 'string',
    feature: 'string',
    label: 'string',
    keys: ['g', 'a'],
  },
]

function CommandLine({ positions }: CommandLineProps) {
  const [{ shortcuts }] = useReduxState(state => ({
    shortcuts: state.shortcuts,
  }))

  console.log(shortcuts.name)
  return (
    <Frame show={shortcuts.name === 'OPEN_COMMAND_LINE'}>
      <Header>
        <LogoContainer>
          <Logo onlySymbol />
          <Heading>Narative Command</Heading>
        </LogoContainer>
        <CloseButton
        // onClick={() => shortcuts.handleShortcutFeature({ name: ESCAPE })}
        >
          <CloseIcon />
        </CloseButton>
      </Header>
      <CommandLineOptions options={options} />
    </Frame>
  )
}

export default CommandLine

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -49%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`

const animation = css`
  animation: ${fadeIn} 0.3s forwards;
`
const Frame = styled.div`
  z-index: 2147483647;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  height: 419px;
  width: 712px;
  background: #14151a;
  border-radius: 5px;
  opacity: 0;
  pointer-events: ${p => (p.show ? 'initial' : 'none')};
  user-select: ${p => (p.show ? 'initial' : 'none')};
  visibility: ${p => (p.show ? 'initial' : 'hidden')};
  ${p => p.show && animation}
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const Heading = styled.h1`
  font-size: 16px;
  margin-left: 24px;
  color: ${p => p.theme.colors.moon};
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const CloseButton = styled.button``
