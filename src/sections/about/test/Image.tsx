import React from 'react'
import styled from 'styled-components'
import { motion, useInvertedScale } from 'framer-motion'
import { closeSpring } from './animations'

export const Image = ({ isSelected, pointOfInterest = 0, src }) => {
  const inverted = useInvertedScale()

  return (
    <IllustrationContainer style={{ ...inverted, originX: 0, originY: 0 }}>
      <Illustration
        src={src.src}
        alt=""
        initial={false}
        animate={isSelected ? { x: 690, y: 80 } : { x: 0, y: 0 }}
        transition={closeSpring}
      />
    </IllustrationContainer>
  )
}

const IllustrationContainer = styled(motion.div)`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: translateZ(0);
`

const Illustration = styled(motion.img)`
  top: 0;
  left: 0;
  overflow: hidden;
  width: 390px;
  height: 470px;
`
