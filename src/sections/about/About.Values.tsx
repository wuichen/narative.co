import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import ButtonPill from '@components/Button/Button.Pill'
import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'
import { useResize } from '@utils'

import AboutHeading from './About.Heading'

const shapeImagesQuery = graphql`
  query GetShapeIllo {
    shapeWithoutShadow: file(name: { regex: "/about-shape-without-shadow/" }) {
      publicURL
    }
    shapeWithShadow: file(name: { regex: "/about-shape-with-shadow/" }) {
      publicURL
    }
    shapeReflection: file(name: { regex: "/about-shape-reflection/" }) {
      publicURL
    }
    shapeBackgroundGlow: file(name: { regex: "/about-shape-glow/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboueValues() {
  const {
    shapeWithoutShadow,
    shapeWithShadow,
    shapeReflection,
    shapeBackgroundGlow,
  } = useStaticQuery(shapeImagesQuery)
  const { toggleContact } = useContext(ContactContext)
  const { width, height } = useResize()
  const shapeRef = useRef()
  const headingRef = useRef()

  const [scaleOptions, setScaleOptions] = useState({ scale: 7, offset: 0 })

  useEffect(() => {
    if (shapeRef.current && headingRef.current) {
      const { height: shapeHeight } = shapeRef.current.getBoundingClientRect()
      const { height: headHeight } = headingRef.current.getBoundingClientRect()
      const TOP_PADDING = 65
      const BOTTOM_MARGIN = 100

      const scale = (shapeHeight + height) / height + 2
      const totalHeadingHeight = headHeight + TOP_PADDING + BOTTOM_MARGIN
      const middleOfWindow = height / 2
      const offset = totalHeadingHeight - middleOfWindow

      setScaleOptions({
        scale,
        offset,
      })
    }
  }, [width, height, shapeRef, headingRef])

  return (
    <AboueValuesContainer>
      <Sticky
        cover
        height="1800px"
        render={({ progress }) => {
          const fastProgress = progress + progress + progress + progress

          const headingAnimation = {
            opacity: 1 - fastProgress,
            filter: `blur(${progress * 20}px)`,
          }

          const valuesAnimation = {
            opacity: progress + 0.25,
          }

          const shapeOffsetAnimation = {
            transform: `translateY(${progress * scaleOptions.offset}px)`,
          }

          const shapeScaleAnimation =
            progress > 0
              ? {
                  transform: `scale(${1 + progress * scaleOptions.scale}) `,
                }
              : {}

          return (
            <AboueValuesInner>
              <div>
                <HeadingContainer ref={headingRef} style={headingAnimation}>
                  <AboutHeading
                    heading="Who we choose to be"
                    text="A company's culture isn’t something to be passed down as commandments, or enforced like law. It's the choices we make every day that defines who we are — as individuals, and as a team. These are our choices."
                  />
                </HeadingContainer>

                <Section narrow>
                  <Values style={valuesAnimation}>
                    <ValuesGrid>
                      <div>
                        <ValueIllo />
                        <ValueHeading>Be kind</ValueHeading>
                        <ValueText>
                          Communicate honestly but sensitively; act with
                          positive intent; and trust others to do the same.
                        </ValueText>
                      </div>
                      <div>
                        <ValueIllo />
                        <ValueHeading>Be creative</ValueHeading>
                        <ValueText>
                          Push beyond best practices and by-the-numbers design
                          to discover valuable new ideas.
                        </ValueText>
                      </div>
                      <div>
                        <ValueIllo />
                        <ValueHeading>Be adaptable</ValueHeading>
                        <ValueText>
                          Strive to grow from every challenge and change, even
                          when it means changing your mind.
                        </ValueText>
                      </div>
                      <div>
                        <ValueIllo />
                        <ValueHeading>Be yourself</ValueHeading>
                        <ValueText>
                          Work and live the way that uniquely suits you, free of
                          rigid hierarchies and arbitrary expectations.
                        </ValueText>
                      </div>
                    </ValuesGrid>
                    <ButtonContainer>
                      <ButtonPill
                        text="Work with our team"
                        onClick={toggleContact}
                      />
                    </ButtonContainer>
                  </Values>
                  <ShapeContainer style={shapeOffsetAnimation}>
                    <ShapeGlow
                      style={{
                        opacity: 1 - fastProgress,
                        transform: shapeScaleAnimation.transform,
                      }}
                    >
                      <Media src={shapeBackgroundGlow.childImageSharp.fluid} />
                    </ShapeGlow>
                    <ShapeRectangle ref={shapeRef} style={shapeScaleAnimation}>
                      <SVG src={shapeWithoutShadow.publicURL} />
                    </ShapeRectangle>
                    <ShapeRectangleWithMask style={shapeScaleAnimation}>
                      <SVG src={shapeWithoutShadow.publicURL} />
                    </ShapeRectangleWithMask>
                    {/* <ShapeRectangle>
                        <SVG src={shapeWithShadow.publicURL} />
                      </ShapeRectangle> */}
                    {/* <ShapeRectangleReflection>
                        <SVG src={shapeReflection.publicURL} />
                      </ShapeRectangleReflection> */}
                  </ShapeContainer>
                </Section>
              </div>
            </AboueValuesInner>
          )
        }}
      />
    </AboueValuesContainer>
  )
}

export default AboueValues

const HeadingContainer = styled.div`
  z-index: 2;
  position: relative;
  will-change: transform, filter;
  margin-bottom: 100px;
`

const ShapeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  pointer-events: none;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 750px;
  position: relative;

  /* top: 50%;
  transform: translate(-50%, -50%); */
  width: 100%;
`

const ShapeRectangle = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 3;
  min-height: 212px;
  will-change: transform;
`

const ShapeRectangleWithMask = styled.figure`
  position: absolute;
  top: 0;
  width: 100%;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 50vh;
    background: #111216;
    top: -50vh;
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 50vh;
    background: #111216;
    bottom: -50vh;
    left: 0;
  }
`

const ShapeRectangleReflection = styled.figure`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100%;
  margin: 0 auto;
`

const ShapeGlow = styled.figure`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -100px;
  z-index: 1;
  will-change: opacity, transform;
`

const AboueValuesContainer = styled.div`
  padding: 150px 0 240px;
`

const AboueValuesInner = styled.div`
  position: relative;
  padding: 65px 0 60vh;
`

const Values = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: transform, filter;
  background: #111216;
`

const ValuesGrid = styled.div`
  top: 0;
  max-width: 750px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 337px 337px;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 1fr;
  justify-content: space-between;
  grid-row-gap: 45px;
  text-align: center;
`

const ValueIllo = styled.div`
  width: 200px;
  height: 120px;
  background: #1d2128;
  margin: 0 auto 15px;
`

const ValueHeading = styled(Heading.h3)`
  margin-bottom: 15px;
`

const ValueText = styled.p`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 55px auto 0;
`
