import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import mediaqueries from '@styles/media'

/**
 * <AboutHeading />
 *
 * [This Is My Big Heading]
 * [this is my smaller text]
 */

const AboutHeading = ({ heading, text }: { heading: string; text: string }) => (
  <AboutHeadingSpacer data-scroll-fade={true}>
    <Section narrow>
      <AboutHeadingContainer>
        <HeadingBackground>
          <LargeHeading>{heading}</LargeHeading>
        </HeadingBackground>
        <Text dangerouslySetInnerHTML={{ __html: text }}></Text>
      </AboutHeadingContainer>
    </Section>
  </AboutHeadingSpacer>
)

export default AboutHeading

const AboutHeadingSpacer = styled.div`
  /* overflow-x: hidden; */
`

const AboutHeadingContainer = styled.div`
  max-width: 750px;
  margin: 0 auto;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const HeadingBackground = styled.div`
  position: relative;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    92.07deg,
    #bfa8a7 0.99%,
    #cfd3de 34.85%,
    #adbbd2 67.46%,
    #9facac 79.92%,
    #e0dbce 93.48%
  );
  color: transparent !important;
  margin-bottom: 15px;
`

const LargeHeading = styled(Heading.h2)`
  display: block;
  font-weight: 700;
  font-size: 70px;
  letter-spacing: -0.5px;
  line-height: 1.1;
  font-family: ${p => p.theme.fontfamily.serif};
  background: transparent;
  color: transparent;
`

const Text = styled.p`
  font-size: 22px;
  line-height: 1.28;
  color: #fff;
`
