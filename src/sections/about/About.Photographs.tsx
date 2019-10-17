import React from 'react'
import styled from 'styled-components'

import Sticky from '@components/Sticky'
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
      <Spacer />
      <Sticky
        cover
        height="100vh"
        render={({ progress }) => (
          <Section narrow>
            <div style={{ position: 'relative' }}>
              <ImageGrid style={{ opacity: progress < 0.8 ? 1 : 0 }}>
                <Images>
                  <Image />
                  <Image />
                </Images>
                <ImagesReverse>
                  <Image />
                  <Image />
                </ImagesReverse>
              </ImageGrid>
              <ImageGrid
                style={{
                  opacity: progress >= 0.8 ? 1 : 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                }}
              >
                <Images>
                  <ImageDark />
                  <ImageDark />
                </Images>
                <ImagesReverse>
                  <ImageDark />
                  <ImageDark />
                </ImagesReverse>
              </ImageGrid>
            </div>
          </Section>
        )}
      />
    </AboutWorkContainer>
  )
}

export default AboutPhotographs

const AboutWorkContainer = styled.div`
  padding: 140px 0 calc(180px - 10vh);
`

const Spacer = styled.div`
  height: 100px;
`

const ImageGrid = styled.div`
  transition: opacity 500ms;
`

const Images = styled.div`
  display: grid;
  grid-template-columns: 66.5fr 33.5fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;
`

const ImagesReverse = styled.div`
  display: grid;
  grid-template-columns: 33.5fr 66.5fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;
`

const Image = styled.div`
  background: #e1dce1;
  height: 416px;
`

const ImageDark = styled.div`
  background: ${p => p.theme.colors.kepler};
  height: 416px;
`
