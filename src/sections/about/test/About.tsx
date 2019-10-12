import React from 'react'
import styled, { css } from 'styled-components'
import { motion, useInvertedScale } from 'framer-motion'
import { closeSpring } from './animations'

import SVG from 'react-inlinesvg'
import Heading from '@components/Heading'

export const About = React.memo(({ person, isSelected }) => {
  const inverted = useInvertedScale()

  return (
    <motion.div
      style={{ ...inverted, originY: 0, originX: 0 }}
      animate={
        isSelected
          ? { x: 100, y: -345, opacity: 1 }
          : { x: 0, y: -345, opacity: 0 }
      }
      transition={closeSpring}
    >
      <Name isSelected={isSelected}>{person.name}</Name>
      <Role isSelected={isSelected}>{person.role}</Role>
      {person.about.map(text => (
        <Text isSelected={isSelected}>{text}</Text>
      ))}
      <SVG src={person.signature} isSelected={isSelected} />
    </motion.div>
  )
})

const animate = css`
  transform: translateY(${p => (p.isSelected ? 0 : 8)}px);
  opacity: ${p => (p.isSelected ? 1 : 0)}
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
`

const Name = styled(Heading.h2)`
  margin-bottom: 5px;
  ${animate}
`

const Role = styled(motion.div)`
  color: ${p => p.theme.colors.grey};
  font-size: 22px;
  transition: color 0.4s;
  margin-bottom: 30px;
  ${animate}
`

const Text = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #fff;
  max-width: 480px;

  &:not(:last-child) {
    margin-bottom: 25px;
  }
  ${animate}
`
