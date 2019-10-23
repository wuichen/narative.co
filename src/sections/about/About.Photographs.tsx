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
  const SECTION_WIDTH_START = 1140
  const SECTION_WIDTH_END = 1260

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

  const containerRef = useRef()
  const imageGridRef = useRef()
  const rowOneRef = useRef()
  const rowTwoRef = useRef()
  const rowThreeRef = useRef()
  const rowFourRef = useRef()

  const [ref, inView] = useInView({ threshold: 0.5 })
  const [sectionHeight, setSectionHeight] = useState(2000)
  const [scale, setScale] = useState(1)
  const { width, height } = useResize()

  const config = { mass: 4, tension: 500, friction: 150 }
  const [propsRowTwo, setRowTwo] = useSpring(() => ({ offset: 1, config }))
  const [propsRowThree, setRowThree] = useSpring(() => ({ offset: 1, config }))
  const [propsRowFour, setRowFour] = useSpring(() => ({ offset: 1, config }))

  // We want to disable the offset on mobile
  const calcTransform = (offset: number) =>
    width > 768 && `translateY(${offset * 20}vh)`

  const rowTwoStyles = {
    transform: propsRowTwo.offset.interpolate(calcTransform),
  }
  const rowThreeStyles = {
    transform: propsRowThree.offset.interpolate(calcTransform),
  }
  const rowFourStyles = {
    transform: propsRowFour.offset.interpolate(calcTransform),
  }

  useEffect(() => {
    if (width >= 768) {
      const handleScroll = throttle(() => {
        if (imageGridRef.current) {
          const getOffset = (el: HTMLElement) =>
            clamp(
              (el.getBoundingClientRect().top +
                (el.getBoundingClientRect().height / 4) * 2) /
                height,
              0,
              1
            )

          setRowTwo({ offset: getOffset(rowOneRef.current) })
          setRowThree({ offset: getOffset(rowTwoRef.current) })
          setRowFour({ offset: getOffset(rowThreeRef.current) })
        }
      }, 10)

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [imageGridRef, width])

  useEffect(() => {
    const {
      height: containerHeight,
      width: containerWidth,
    } = containerRef.current.getBoundingClientRect()
    setSectionHeight(containerHeight)

    if (containerWidth > SECTION_WIDTH_START) {
      setScale(
        SECTION_WIDTH_START / clamp(containerWidth, 320, SECTION_WIDTH_END)
      )
    }
  }, [width])

  return (
    <>
      <LightOverlay inView={inView} />
      <AboutWorkContainer>
        <Sticky
          height={`${sectionHeight}px`}
          render={({ progress }: StickyState) => {
            const headingClass = inView ? 'Heading__InView' : ''
            const textClass = inView ? 'Text__InView' : ''
            const firstRowScale = clamp(
              scale + progress * 6 * (1 - scale),
              0,
              1
            )

            return (
              <ImageSection ref={containerRef}>
                <LightSection>
                  <AboutHeading
                    heading={`<div class="${headingClass}">Going the distance</div>`}
                    text={`<span class="${textClass}">Narative is an all-remote team, meaning we work physically apart — something that's taught us the importance of always staying in sync. We communicate constantly and transparently, with each other and with each of our partners. And when it matters most, we make sure to all get together.</span>`}
                  />
                  <Spacer />
                  <ImageGrid style={{ transform: `scale(${firstRowScale})` }}>
                    <div ref={ref}>
                      <Images ref={rowOneRef}>
                        <ImageWrapper>
                          <StyledImage src={lightOne.childImageSharp.fluid} />
                        </ImageWrapper>
                        <ImageWrapper hideOnMobile>
                          <StyledImage src={lightTwo.childImageSharp.fluid} />
                        </ImageWrapper>
                      </Images>
                      <ImagesMobile style={rowTwoStyles}>
                        <ImageWrapper>
                          <StyledImage src={lightTwo.childImageSharp.fluid} />
                        </ImageWrapper>
                        <ImageWrapper>
                          <StyledImage src={lightThree.childImageSharp.fluid} />
                        </ImageWrapper>
                      </ImagesMobile>

                      <animated.div style={rowTwoStyles}>
                        <ImagesReverse ref={rowTwoRef}>
                          <ImageWrapper hideOnMobile>
                            <StyledImage
                              src={lightThree.childImageSharp.fluid}
                            />
                          </ImageWrapper>
                          <ImageWrapper>
                            <StyledImage
                              src={lightFour.childImageSharp.fluid}
                            />
                          </ImageWrapper>
                        </ImagesReverse>
                      </animated.div>
                    </div>
                  </ImageGrid>
                </LightSection>
                <ImageGrid ref={imageGridRef}>
                  <animated.div style={rowThreeStyles}>
                    <Images ref={rowThreeRef}>
                      <ImageWrapper>
                        <StyledImage src={darkOne.childImageSharp.fluid} />
                      </ImageWrapper>
                      <ImageWrapper hideOnMobile>
                        <StyledImage src={darkTwo.childImageSharp.fluid} />
                      </ImageWrapper>
                    </Images>
                  </animated.div>
                  <ImagesMobile>
                    <ImageWrapper>
                      <StyledImage src={darkTwo.childImageSharp.fluid} />
                    </ImageWrapper>
                    <ImageWrapper>
                      <StyledImage src={darkThree.childImageSharp.fluid} />
                    </ImageWrapper>
                  </ImagesMobile>
                  <animated.div style={rowFourStyles}>
                    <ImagesReverse ref={rowFourRef}>
                      <ImageWrapper hideOnMobile>
                        <StyledImage src={darkThree.childImageSharp.fluid} />
                      </ImageWrapper>
                      <ImageWrapper>
                        <StyledImage src={darkFour.childImageSharp.fluid} />
                      </ImageWrapper>
                    </ImagesReverse>
                  </animated.div>
                </ImageGrid>
              </ImageSection>
            )
          }}
        />
      </AboutWorkContainer>
    </>
  )
}

export default AboutPhotographs

const LightSection = styled.div`
  position: relative;
`

const ImageSection = styled.div`
  width: 100%;
  padding: 140px 15px 0px;
  max-width: 1260px;
  margin: 0px auto;
  overflow: hidden;

  ${media.phablet`
    padding: 0 15px 0px;
  `}
`

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
    padding: 100px 0 0;
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
  transition: opacity 1s;
  pointer-events: none;
`

const Spacer = styled.div`
  height: 10vh;
  max-height: 30px;
`

const ImageGrid = styled.div`
  position: relative;
  margin: 15px 0;
  will-change: transform;
  z-index: 2;
`

const Images = styled.div`
  display: grid;
  grid-template-columns: 70fr 30fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImagesReverse = styled.div`
  display: grid;
  grid-template-columns: 30fr 70fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImagesMobile = styled.div`
  display: none;

  ${media.tablet`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImageWrapper = styled.div<{ hideOnMobile?: boolean }>`
  height: 73.4vh;
  min-height: 500px;
  max-height: 540px;

  ${media.desktop`
    height: 62vh;
  `}

  ${media.tablet`
    ${p => p.hideOnMobile && `display: none;`}
  `}

  ${media.phablet`
    height: 33vh;
    min-height: 260px;
  `}
`
