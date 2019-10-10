import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import mediaqueries from '@styles/media'

import AboutHeading from './About.Heading'

function AboutPhotographs() {
  return (
    <AboutWorkContainer>
      <AboutHeading
        heading="Going the distance"
        text="Narative is an all-remote team, meaning we work physically apart — something that's taught us the importance of always staying in sync. We communicate constantly and transparently, with each other and with each of our partners.
    And when it matters most, we make sure to all get together."
      />
      <Section narrow>
        <ImageGrid>
          <Image></Image>
          <MiddleGrid>
            <NarrowImage></NarrowImage>
            <NarrowImage></NarrowImage>
          </MiddleGrid>
          <Image></Image>
        </ImageGrid>
      </Section>
    </AboutWorkContainer>
  )
}

export default AboutPhotographs

const AboutWorkContainer = styled.div`
  padding: 140px 0 160px;
  overflow-x: hidden;
`

const ImageGrid = styled.div`
  max-width: 944px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 470px 517px 470px;
  grid-row-gap: 30px;
  margin: 150px auto 120px;
`

const MiddleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
`

const Image = styled.div`
  background: #fafafa;
  opacity: 0.75;
  height: 470px;
`

const NarrowImage = styled.div`
  background: #fafafa;
  opacity: 0.75;
  height: 517px;
`
