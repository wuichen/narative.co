import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { useInView } from 'react-intersection-observer'

import Image from '@components/Image'
import Sticky, { StickyState } from '@components/Sticky'

import media from '@styles/media'
import { clamp, useResize } from '@utils'

import AboutHeading from './About.Heading'

export const galleryQuery = graphql`
  {
    lightOne: file(name: { regex: "/placeholder-light-1/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightTwo: file(name: { regex: "/placeholder-light-2/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightThree: file(name: { regex: "/placeholder-light-3/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightFour: file(name: { regex: "/placeholder-light-4/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkOne: file(name: { regex: "/placeholder-dark-1/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkTwo: file(name: { regex: "/placeholder-dark-2/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkThree: file(name: { regex: "/placeholder-dark-3/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkFour: file(name: { regex: "/placeholder-dark-4/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboutPhotographs() {
  const {
    lightOne,
    lightTwo,
    lightThree,
    lightFour,
    darkOne,
    darkTwo,
    darkThree,
    darkFour,
  } = useStaticQuery(galleryQuery)

  console.log({
    lightOne,
    lightTwo,
    lightThree,
    lightFour,
    darkOne,
    darkTwo,
    darkThree,
    darkFour,
  })
  const containerRef = useRef()
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [sectionHeight, setSectionHeight] = useState(2000)
  const [scale, setScale] = useState(1)
  const { width, height } = useResize()

  useEffect(() => {
    const box = containerRef.current.getBoundingClientRect()
    setSectionHeight(box.height)

    if (box.width !== 1140) {
      setScale(1140 / box.width)
    }
  }, [width])

  return (
    <>
      <LightOverlay inView={inView}></LightOverlay>

      <div>
        <AboutWorkContainer>
          <Sticky
            height={`${sectionHeight}px`}
            render={({ progress }: StickyState) => {
              const scaleFirstGrid = clamp(
                scale + progress * 4 * (1 - scale),
                0,
                1
              )

              return (
                <div
                  style={{ width: '100%', padding: '140px 15px 0' }}
                  ref={containerRef}
                >
                  <div ref={ref}>
                    <AboutHeading
                      heading={`<div class="${
                        inView ? 'Heading__InView' : ''
                      }">Going the distance</div>`}
                      text={`<span class="${
                        inView ? 'Text__InView' : ''
                      }">Narative is an all-remote team, meaning we work physically apart — something that's taught us the importance of always staying in sync. We communicate constantly and transparently, with each other and with each of our partners.
    And when it matters most, we make sure to all get together.</span>`}
                    />
                    <Spacer />

                    <ImageGrid
                      style={{
                        transform: `scale(${scaleFirstGrid}) translateY(-${(1 -
                          progress) *
                          20}%)`,
                        zIndex: 2,
                      }}
                    >
                      <Images data-scroll-fade={true}>
                        <ImageLight>
                          <StyledImage src={lightOne.childImageSharp.fluid} />
                        </ImageLight>
                        <ImageLight>
                          <StyledImage src={lightTwo.childImageSharp.fluid} />
                        </ImageLight>
                      </Images>
                      <ImagesReverse data-scroll-fade={true}>
                        <ImageLight>
                          <StyledImage src={lightThree.childImageSharp.fluid} />
                        </ImageLight>
                        <ImageLight>
                          <StyledImage src={lightFour.childImageSharp.fluid} />
                        </ImageLight>
                      </ImagesReverse>
                    </ImageGrid>
                  </div>
                  <ImageGrid
                    style={{
                      transform: ` translateY(-${(1 - progress) * 20}%)`,
                    }}
                  >
                    <Images data-scroll-fade={true}>
                      <ImageDark>
                        <StyledImage src={darkOne.childImageSharp.fluid} />
                      </ImageDark>
                      <ImageDark>
                        <StyledImage src={darkTwo.childImageSharp.fluid} />
                      </ImageDark>
                    </Images>
                    <ImagesReverse data-scroll-fade={true}>
                      <ImageDark>
                        <StyledImage src={darkThree.childImageSharp.fluid} />
                      </ImageDark>
                      <ImageDark>
                        <StyledImage src={darkFour.childImageSharp.fluid} />
                      </ImageDark>
                    </ImagesReverse>
                  </ImageGrid>
                </div>
              )
            }}
          />
        </AboutWorkContainer>
      </div>
    </>
  )
}

export default AboutPhotographs

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
const AboutWorkContainer = styled.div`
  position: relative;
  padding: 0 0 calc(180px - 10vh);

  ${media.tablet`
    padding: 100px 0 calc(180px - 10vh);
  `}

  .Heading__InView {
    color: #111216;
    transition: color 0.3s;
  }

  .Text__InView {
    color: ${p => p.theme.colors.grey};
    transition: color 0.3s;
  }
`

const LightOverlay = styled.div<{ inView: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.colors.sirius};
  opacity: ${p => (p.inView ? 1 : 0)};
  transition: opacity 0.6s;
  pointer-events: none;
`

const Spacer = styled.div`
  height: 18vh;
`

const ImageGrid = styled.div`
  position: relative;
  margin: 15px 0;
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

const ImageLight = styled.div`
  background: #e1dce1;
  height: 73.4vh;
`

const ImageDark = styled.div`
  background: ${p => p.theme.colors.kepler};
  height: 73.4vh;
`
