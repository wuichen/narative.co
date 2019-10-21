import React from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import media from '@styles/media'

function Divider() {
  return (
    <Section>
      <HorizontalDiver />
    </Section>
  )
}

export default Divider

const HorizontalDiver = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background: radial-gradient(
    50.14% 6037801.28% at 50.14% 100.05%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
`
