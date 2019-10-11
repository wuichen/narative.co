import React, { useContext } from 'react'
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

function AboutChoose() {
  const {
    shapeWithoutShadow,
    shapeWithShadow,
    shapeReflection,
    shapeBackgroundGlow,
  } = useStaticQuery(shapeImagesQuery)
  const { toggleContact } = useContext(ContactContext)

  return (
    <AboutChooseContainer>
      <Sticky
        height="2200px"
        cover
        render={({ progress }) =>
          console.log(progress) || (
            <AboutChooseInner>
              <>
                <div>
                  <HeadingContainer
                    style={{
                      opacity:
                        1 -
                        (progress +
                          progress +
                          progress +
                          progress +
                          progress +
                          progress),
                      filter: `blur(${progress * 20}px)`,
                    }}
                  >
                    <AboutHeading
                      heading="Who we choose to be"
                      text="A company's culture isn’t something to be passed down as commandments, or enforced like law. It's the choices we make every day that defines who we are — as inHeadingContaineriduals, and as a team. These are our choices."
                    />
                  </HeadingContainer>

                  <Section narrow>
                    <Values
                      style={{
                        opacity: progress + 0.5,
                        filter: `blur(${(0.8 - progress) * 5}px)`,
                      }}
                    >
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
                            Work and live the way that uniquely suits you, free
                            of rigid hierarchies and arbitrary expectations.
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
                    <ShapeContainer
                      style={{
                        transform: `scale(${1 + progress * 7})`,
                      }}
                    >
                      <ShapeGlow
                        style={{
                          opacity:
                            1 -
                            (progress +
                              progress +
                              progress +
                              progress +
                              progress),
                        }}
                      >
                        <Media
                          src={shapeBackgroundGlow.childImageSharp.fluid}
                        />
                      </ShapeGlow>
                      <ShapeRectangle>
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
                  </Section>
                </div>
              </>
            </AboutChooseInner>
          )
        }
      />
    </AboutChooseContainer>
  )
}

export default AboutChoose

const HeadingContainer = styled.div`
  z-index: 2;
  position: relative;
  will-change: transform, filter;
`
const ShapeContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  pointer-events: none;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 750px;

  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`

const ShapeRectangle = styled.figure`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 3;
`

const ShapeRectangleWithMask = styled.figure`
  position: absolute;
  width: 100%;
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
  top: -200px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  will-change: opacity;
`

const AboutChooseContainer = styled.div`
  padding: 85px 0 240px;
`

const AboutChooseInner = styled.div`
  position: relative;
  padding: 65px 0 70vh;
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
