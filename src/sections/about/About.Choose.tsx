import React, { useContext } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import ButtonPill from '@components/Button/Button.Pill'
import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky from '@components/Sticky'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'

import AboutHeading from './About.Heading'

const shapeIlloQuery = graphql`
  query GetShapeIllo {
    shape: file(name: { regex: "/about-glow-shape/" }) {
      publicURL
    }
  }
`

function AboutChoose() {
  const { shape } = useStaticQuery(shapeIlloQuery)
  const { toggleContact } = useContext(ContactContext)

  console.log(shape)
  return (
    <AboutChooseContainer>
      <Sticky
        height="1600px"
        cover
        render={({ progress }) =>
          console.log(progress) || (
            <AboutChooseInner>
              <>
                <div>
                  <div
                    style={{
                      opacity: 1 - (progress + progress + progress),
                      filter: `blur(${progress * 40}px)`,
                    }}
                  >
                    <AboutHeading
                      heading="Who we choose to be"
                      text="A company's culture isn’t something to be passed down as commandments, or enforced like law. It's the choices we make every day that defines who we are — as individuals, and as a team. These are our choices."
                    />
                  </div>

                  <Section narrow>
                    <ShapeContainer
                      style={{
                        transform: `scale(${1 + progress * 10})`,
                      }}
                    >
                      <SVG src={shape.publicURL} />
                    </ShapeContainer>
                    <Values
                      style={{
                        opacity: 1.4 - (1.4 - progress),
                        filter: `blur(${(0.5 - progress) * 10}px)`,
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
