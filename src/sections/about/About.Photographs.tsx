import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import throttle from 'lodash/throttle'

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
  const imageGridRef = useRef()
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [sectionHeight, setSectionHeight] = useState(2000)
  const [scale, setScale] = useState(1)
  const { width, height } = useResize()

  useEffect(() => {
    const box = containerRef.current.getBoundingClientRect()
    setSectionHeight(box.height)

    if (box.width !== 1140 && box.width > 1140) {
      setScale(1140 / clamp(box.width, 320, 1680))
    }
  }, [width])

  const config = { mass: 1, tension: 440, friction: 50 }

  const [props, set] = useSpring(() => ({
    offset: 1,
    config,
  }))

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (imageGridRef.current) {
        const top = imageGridRef.current.getBoundingClientRect().top
        const offset = clamp(top / height, 0, 1)
        set({ offset })
      }
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [imageGridRef])

  const calcTransform = (offset: number): string =>
    `translateY(${offset * 25}vh)`

  const animatedStyles = {
    transform: props.offset.interpolate(calcTransform),
  }

  return (
    <>
      <LightOverlay inView={inView}></LightOverlay>

      <div>
        <AboutWorkContainer>
          <Sticky
            height={`${sectionHeight}px`}
            render={({ progress }: StickyState) => {
              const scaleFirstGrid = clamp(
                scale + progress * 3 * (1 - scale),
                0,
                1
              )

              return (
                <div
                  style={{
                    width: '100%',
                    padding: '140px 15px 0',
                    maxWidth: '1260px',
                    margin: '0 auto',
                    overflow: 'hidden',
                  }}
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

                    <ImageGrid
                      style={{
                        transform: `scale(${scaleFirstGrid})`,
                        zIndex: 2,
                        willChange: 'transform',
                      }}
                    >
                      <Images>
                        <ImageLight>
                          <StyledImage src={lightOne.childImageSharp.fluid} />
                        </ImageLight>
                        <ImageLight>
                          <StyledImage src={lightTwo.childImageSharp.fluid} />
                        </ImageLight>
                      </Images>
                      <ImagesReverse>
                        <ImageLight>
                          <StyledImage src={lightThree.childImageSharp.fluid} />
                        </ImageLight>
                        <ImageLight>
                          <StyledImage src={lightFour.childImageSharp.fluid} />
                        </ImageLight>
                      </ImagesReverse>
                    </ImageGrid>
                  </div>
                  <animated.div style={animatedStyles}>
                    <ImageGrid
                      style={{
                        willChange: 'transform',
                      }}
                      ref={imageGridRef}
                    >
                      <Images>
                        <ImageDark>
                          <StyledImage src={darkOne.childImageSharp.fluid} />
                        </ImageDark>
                        <ImageDark>
                          <StyledImage src={darkTwo.childImageSharp.fluid} />
                        </ImageDark>
                      </Images>
                      <ImagesReverse>
                        <ImageDark>
                          <StyledImage src={darkThree.childImageSharp.fluid} />
                        </ImageDark>
                        <ImageDark>
                          <StyledImage src={darkFour.childImageSharp.fluid} />
                        </ImageDark>
                      </ImagesReverse>
                    </ImageGrid>
                  </animated.div>
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
  }

  .Text__InView {
    color: ${p => p.theme.colors.grey};
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
  height: 10vh;
  max-height: 100px;
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
  max-height: 660px;

  ${media.desktop`
    height: 60vh;
  `}

  ${media.tablet`
    height: 33vh;
  `}
`

const ImageDark = styled.div`
  background: ${p => p.theme.colors.kepler};
  height: 73.4vh;
  max-height: 660px;

  ${media.desktop`
    height: 60vh;
  `}

  ${media.tablet`
    height: 33vh;
  `}
`
