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

  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (shapeRef.current) {
      const shapeRect = shapeRef.current.getBoundingClientRect()
      const scale = (shapeRect.height + height) / height + 2
      setScale(scale)
    }
  }, [width, height, shapeRef])

  const values = [
    {
      heading: 'Be kind',
      text:
        'Communicate honestly but sensitively; act with positive intent; and trust others to do the same.',
      illullstration: '',
    },
    {
      heading: 'Be creative',
      text:
        'Push beyond best practices and by-the-numbers design to discover valuable new ideas',
      illullstration: '',
    },
    {
      heading: 'Be adaptable',
      text:
        'Strive to grow from every challenge and change, even when it means changing your mind.',
      illullstration: '',
    },
    {
      heading: 'Be yourself',
      text:
        'Work and live the way that uniquely suits you, free of rigid hierarchies and arbitrary expectations.',
      illullstration: '',
    },
  ]

  return (
    <AboueValuesContainer>
      <HeadingContainer ref={headingRef}>
        <AboutHeading
          heading="Who we choose to be"
          text="A company's culture isn’t something to be passed down as commandments, or enforced like law. It's the choices we make every day that defines who we are — as individuals, and as a team. These are our choices."
        />
      </HeadingContainer>
      <Sticky
        cover
        height="1800px"
        render={({ progress }) => {
          const fastProgress = progress + progress + progress + progress

          const valuesAnimation = {
            opacity: progress,
            pointerEvents: progress > 0.5 ? 'initial' : 'none',
          }

          const shapeScaleAnimation =
            progress > 0
              ? {
                  transform: `translateY(-50%) scale(${1 + progress * scale})`,
                  pointerEvents: progress <= 0.5 ? 'initial' : 'none',
                }
              : {}

          return (
            <>
              <Section narrow>
                <Values style={valuesAnimation}>
                  <ValuesGrid>
                    {values.map(value => (
                      <div key={value.heading}>
                        <ValueIllo />
                        <ValueHeading>{value.heading}</ValueHeading>
                        <ValueText>{value.text}</ValueText>
                      </div>
                    ))}
                  </ValuesGrid>
                  <ButtonContainer>
                    <ButtonPill
                      text="Work with our team"
                      onClick={toggleContact}
                    />
                  </ButtonContainer>
                </Values>
              </Section>
              <ShapeContainer style={shapeScaleAnimation}>
                <ShapeGlow style={{ opacity: 1 - fastProgress }}>
                  <Media src={shapeBackgroundGlow.childImageSharp.fluid} />
                </ShapeGlow>
                <ShapeRectangle ref={shapeRef}>
                  <SVG src={shapeWithoutShadow.publicURL} />
                </ShapeRectangle>
                <ShapeRectangleWithMask>
                  <SVG src={shapeWithoutShadow.publicURL} />
                </ShapeRectangleWithMask>
                {/* <ShapeRectangle>
                        <SVG src={shapeWithShadow.publicURL} />
                      </ShapeRectangle> */}
                {/* <ShapeRectangleReflection>
                        <SVG src={shapeReflection.publicURL} />
                      </ShapeRectangleReflection> */}
              </ShapeContainer>
            </>
          )
        }}
      />
    </AboueValuesContainer>
  )
}

export default AboueValues

const AboueValuesContainer = styled.div`
  padding: 0px 0 100px;
`

const HeadingContainer = styled.div`
  position: relative;
  will-change: transform, filter;
  transform: translateY(24vh);
  z-index: 1;
`

const ShapeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  top: 50%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 750px;
  position: absolute;
  transform: translateY(-50%);
  will-change: transform;
`

const ShapeRectangle = styled.figure`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 3;
  transform: translateY(-50%);
  will-change: transform;
`

const ShapeRectangleWithMask = styled.figure`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
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
  top: 160px;
  z-index: 1;
  will-change: opacity, transform;
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
`

const ValueIllo = styled.div`
  width: 31px;
  height: 31px;
  background: #93c3ea;
  margin-bottom: 15px;
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
