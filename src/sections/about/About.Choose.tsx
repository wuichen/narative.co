import React from 'react'
import styled from 'styled-components'

import Divider from '@components/Divider'
import Heading from '@components/Heading'
import Section from '@components/Section'
import mediaqueries from '@styles/media'

import AboutHeading from './About.Heading'

function AboutChoose() {
  return (
    <AboutChooseContainer>
      <AboutHeading
        heading="Who we choose to be"
        text="A company's culture isn’t something to be passed down as commandments, or enforced like law. It's the choices we make every day that defines who we are — as individuals, and as a team. These are our choices."
      />
      <Section narrow>
        <ShapePlaceholder />
        <ValuesGrid>
          <div>
            <ValueIllo />
            <ValueHeading>Be kind</ValueHeading>
            <ValueText>
              Communicate honestly but sensitively; act with positive intent;
              and trust others to do the same.
            </ValueText>
          </div>
          <div>
            <ValueIllo />
            <ValueHeading>Be creative</ValueHeading>
            <ValueText>
              Push beyond best practices and by-the-numbers design to discover
              valuable new ideas.
            </ValueText>
          </div>
          <div>
            <ValueIllo />
            <ValueHeading>Be adaptable</ValueHeading>
            <ValueText>
              Strive to grow from every challenge and change, even when it means
              changing your mind.
            </ValueText>
          </div>
          <div>
            <ValueIllo />
            <ValueHeading>Be yourself</ValueHeading>
            <ValueText>
              Work and live the way that uniquely suits you, free of rigid
              hierarchies and arbitrary expectations.
            </ValueText>
          </div>
        </ValuesGrid>
      </Section>
    </AboutChooseContainer>
  )
}

export default AboutChoose

const ShapePlaceholder = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 580px;
  background: linear-gradient(rgba(255, 255, 255, 0.5), transparent);
`

const AboutChooseContainer = styled.div`
  padding: 185px 0 240px;
`

const ValuesGrid = styled.div`
  max-width: 750px;
  margin: 0 auto;
  position: relative;
  top: -150px;
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
