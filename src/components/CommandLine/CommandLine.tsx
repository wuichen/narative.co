import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'

import CommandLineOptions from '@components/CommandLine/CommandLine.Options'
import CommandLineTips from '@components/CommandLine/CommandLine.Tips'
import createCommandLineParts from './utils'

import shortcuts, { constants } from '../../shortcuts'
import { useReduxState } from '../../store'
import { CloseIcon } from '../../icons/ui'
import { scrollable, getBreakpointFromTheme, useResize } from '@utils'

import mediaqueries from '@styles/media'

const handleClose = () =>
  shortcuts.handleShortcutFeature({ name: constants.ESCAPE })

function CommandLine() {
  const [{ name }] = useReduxState(state => ({
    name: state.shortcuts.name,
  }))
  const { width } = useResize()
  const screenIsWideEnough = width > getBreakpointFromTheme('desktop')
  const open = screenIsWideEnough && name && name.includes('COMMAND_LINE')
  const { list, CommandLineHeading } = createCommandLineParts(name)

  useEffect(() => {
    if (open) {
      scrollable('disable')
    } else {
      scrollable('enable')
    }

    if (!screenIsWideEnough) handleClose()
  }, [open])

  // This component is mounted, but not returning anything until it's open!
  if (!open) return <CommandLineTips />

  return (
    <OutsideClickHandler onOutsideClick={handleClose}>
      <Frame>
        <Header>
          <LogoContainer>
            <CommandLineHeading />
          </LogoContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <CommandLineOptions key={name} list={list} name={name} />
      </Frame>
    </OutsideClickHandler>
  )
}

export default CommandLine

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48.8%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`

const Frame = styled.div`
  z-index: 2147483647;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  height: 418px;
  width: 712px;
  background: rgba(29, 33, 40, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  opacity: 0;

  will-change: opacity, transform;
  animation: ${fadeIn} 0.25s forwards;
  overflow: hidden;

  ${mediaqueries.desktop`
    display: none;
  `}
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(115, 115, 125, 0.3);
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const CloseButton = styled.button``
