import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import mediaqueries from '@styles/media'

import AboutHeading from './About.Heading'

function AboutChoose() {
  return (
    <AboutHeadingSpacer>
      <HeadingLineBreak>
        <AboutHeading
          heading="Independent, but never alone"
          text="While we like to do things our own way, nobody can do it all by themselves. <div style='color:#73737D'>Narative believes in building ongoing partnerships based on trust, and in contributing our ideas and work to the open source community. When we do honest work, good word spreads, and we can all build ever-greater things.</div>"
        />
      </HeadingLineBreak>
      <Section narrow>
        <AboutChooseContainer></AboutChooseContainer>
      </Section>
    </AboutHeadingSpacer>
  )
}

export default AboutChoose

const AboutHeadingSpacer = styled.div`
  padding-bottom: 20rem;
  overflow-x: hidden;

  ${mediaqueries.desktop_large`
    padding-bottom: 15rem;
  `};

  ${mediaqueries.desktop`
    padding-bottom: 10rem;
  `};

  ${mediaqueries.tablet`
    padding-bottom: 6rem;
  `};
`

const AboutChooseContainer = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const HeadingLineBreak = styled.div`
  h2 {
    width: 70%;
    display: block;
  }
`
