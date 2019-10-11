import React, { memo, useRef } from 'react'
import styled from 'styled-components'
import { motion, useMotionValue } from 'framer-motion'
// import { Link } from "react-router-dom";
import { openSpring, closeSpring } from './animations'

import { ContentPlaceholder } from './ContentPlaceholder'
import { Name } from './Name'
import { Role } from './Role'
import { Image } from './Image'

import Media from '@components/Media/Media.Img'
import Heading from '@components/Heading'

import {
  useScrollConstraints,
  useInvertedBorderRadius,
  useWheelScroll,
} from './utils'

export interface CardData {
  id: string
  category: string
  title: string
  pointOfInterest: number
  handleRef?: () => void
}

interface Props extends CardData {
  isSelected: boolean
  history: {
    push: (route: string) => void
  }
}

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 50

export const Card = memo(
  ({
    person,
    isSelected,
    id = 'c',
    title = '5 Food Apps Delivering the Best of Your City',
    category = 'Pizza',
    history,
    pointOfInterest = 0,
    handleRef,
    handleOutsideClick,
  }: Props) => {
    const y = useMotionValue(0)
    const zIndex = useMotionValue(isSelected ? 2 : 0)

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(5)

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null)
    const constraints = useScrollConstraints(cardRef, isSelected)

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && history.push('/')
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(2)
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0)
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null)
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    )

    React.useEffect(() => {
      handleRef(containerRef)
    }, [])

    const openCardContent = isSelected
      ? {
          height: 'auto',
          maxWidth: '1140px',
          maxHeight: '630px',
          overflow: 'hidden',
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
        <Overlay
          isSelected={isSelected}
          handleOutsideClick={handleOutsideClick}
        />
        <CardContent isSelected={isSelected} onClick={handleOutsideClick}>
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
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              src={person && person.illustration.childImageSharp.fluid}
            />
            {/* <Name name={person.name} isSelected={isSelected} />
            <Role role={person.role} isSelected={isSelected} /> */}
            {/* {/* <Role role={persona.role}  isSelected={isSelected} /> */}
            <ContentPlaceholder />
            {/* {person && (
              <Container key={person.name}>
                <Illustration>
                  <Media
                    src={person.illustration.childImageSharp.fluid}
                    loading="eager"
                  />
                </Illustration>
                <div style={{ position: 'relative' }}>
                  <Name>{person.name}</Name>
                  <Role>{person.role}</Role>
                </div>
              </Container>
            )} */}
          </ContentContainer>
        </CardContent>
      </CardContainer>
    )
  }
)

export default Card

const Overlay = ({ isSelected, handleOutsideClick }) => (
  <OverlayContainer
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
  />
)

const OverlayContainer = styled(motion.div)`
  z-index: 1;
  position: fixed;
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
`

const CardContainer = styled.div<{ isSelected: boolean }>`
  position: relative;
  padding: 25px;
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
    padding: 40px 0;
    display: flex;
    align-items: center;
  `}
`

const ContentContainer = styled(motion.div)`
  max-width: 1140px;
  width: 90vw;
`
