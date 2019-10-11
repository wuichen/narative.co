import React from 'react'
import styled from 'styled-components'
import { motion, useInvertedScale } from 'framer-motion'
import { closeSpring, openSpring } from './animations'

import Heading from '@components/Heading'

export const Role = ({ role, isSelected }) => {
  const inverted = useInvertedScale()
  const x = isSelected ? 30 : 15
  const y = 50

  return (
    <RoleContainer
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      {role}
    </RoleContainer>
  )
}

/**
 * `transform` is order-dependent, so if you scale(0.5) before translateX(100px),
 * the visual translate will only be 50px.
 *
 * The intuitive pattern is to translate before doing things like scale and
 * rotate that will affect the coordinate space. So Framer Motion takes an
 * opinion on that and allows you to animate them
 * individually without having to write a whole transform string.
 *
 * However in this component we're doing something novel by inverting
 * the scale of the parent component. Because of this we want to translate
 * through scaled coordinate space, and can use the transformTemplate prop to do so.
 */
const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`

const RoleContainer = styled(motion.div)`
  color: ${p => p.theme.colors.grey};
  font-size: 22px;
  transition: color 0.4s;
`
