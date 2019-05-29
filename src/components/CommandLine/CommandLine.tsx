import React, { useContext } from 'react'
import styled from 'styled-components'

import CommandLineOptions from './CommandLineOptions'
import Logo from '../Logo'
import { CloseIcon } from '../../icons/ui'
import { ShortcutContext } from '../../shortcuts/context'

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
  const { shortcut } = useContext(ShortcutContext)
  console.log(shortcut)
  return (
    <Frame>
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
