import React, { memo, useRef } from 'react'
import styled from 'styled-components'
import { motion, useMotionValue } from 'framer-motion'

import media from '@styles/media'
import { useInvertedBorderRadius } from '@utils'
import { scrollable } from '@utils'

interface AboutTeamModalProps {
  isSelected: boolean
  handleRef: (ref: any) => void
}

const openSpring = { type: 'spring', stiffness: 200, damping: 30 }
const closeSpring = { type: 'spring', stiffness: 300, damping: 35 }

function AboutTeamModal({ isSelected, handleRef }: AboutTeamModalProps) {
  const y = useMotionValue(0)
  const zIndex = useMotionValue(isSelected ? 2 : 0)

  // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
  const inverted = useInvertedBorderRadius(5)

  // We'll use the opened card element to calculate the scroll constraints
  const cardRef = useRef(null)

  function checkZIndex(latest) {
    if (isSelected) {
      zIndex.set(2)
    } else if (!isSelected && latest.scaleX < 1.01) {
      zIndex.set(0)
    }
  }

  // When this card is selected, attach a wheel event listener
  const containerRef = useRef(null)

  React.useEffect(() => {
    handleRef(containerRef)
  }, [])

  const openCardContent = isSelected
    ? {
        maxWidth: '1140px',
        maxHeight: '630px',
      }
    : {}

  return (
    <CardContainer
      ref={containerRef}
      isSelected={isSelected}
      style={{
        pointerEvents: isSelected ? 'auto' : 'none',
        opacity: isSelected ? 1 : 0,
      }}
    >
      <Overlay isSelected={isSelected} />
      <CardContent isSelected={isSelected}>
        <ContentContainer
          ref={cardRef}
          style={{
            background: '#000',
            y,
            zIndex,
            ...inverted,
            ...openCardContent,
          }}
          layoutTransition={isSelected ? openSpring : closeSpring}
          drag={isSelected ? 'y' : false}
          onUpdate={checkZIndex}
        ></ContentContainer>
      </CardContent>
    </CardContainer>
  )
}

export default memo(AboutTeamModal)

const Overlay = ({ isSelected }: { isSelected: boolean }) => (
  <OverlayContainer
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
  />
)

const OverlayContainer = styled(motion.div)`
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
`

const CardContainer = styled.div<{ isSelected: boolean }>`
  position: relative;
  height: 470px;
  width: 390px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  top: 0;
  display: flex;
  transition: opacity 0s;
  ${p => !p.isSelected && `transition-delay: 0.4s;`}
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.2);

  ${media.tablet`
    height: 66vh;
    max-height: 550px;
`}

  ${media.phablet`
    height: 410px;
    width: calc(100vw - 40px);
  `}

  ${media.phone_small`
    height: 380px;
  `}
`

const CardContent = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;

  ${p =>
    p.isSelected &&
    `
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
  `}

  ${media.tablet`

  ${p =>
    p.isSelected &&
    `
      padding: 20px;
  
  `}
    `}

  ${media.phablet`

  ${p =>
    p.isSelected &&
    `
      padding: 30px 15px;
  
  `}
    `}
`

const ContentContainer = styled(motion.div)`
  max-width: 1140px;
  max-height: 630px;
  position: relative;
  background: #000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  ${media.tablet`
    padding: 20px;
  `}

  ${media.phablet`
    width: 100%;  

  `}
`
