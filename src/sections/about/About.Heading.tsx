import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import media from '@styles/media'

/**
 * <AboutHeading />
 *
 * [This Is My Big Heading]
 *
 * [this is my smaller text]
 * [this is my smaller text]
 * [this is my smaller text]
 */

const AboutHeading = ({ heading, text }: { heading: string; text: string }) => (
  <Section narrow data-scroll-fade={true}>
    <AboutHeadingContainer>
      <HeadingBackground>
        <LargeHeading dangerouslySetInnerHTML={{ __html: heading }} />
      </HeadingBackground>
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </AboutHeadingContainer>
  </Section>
)

export default AboutHeading

const AboutHeadingContainer = styled.div`
  max-width: 750px;
  margin: 0 auto;

  ${media.desktop`
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

  ${media.desktop`
    font-size: 60px;
  `}

  ${media.tablet`
    font-size: 50px;
  `}

  ${media.phablet`
    font-size: 40px;
  `}

  ${media.phone_small`
    font-size: 32px;
  `}
`

const Text = styled.p`
  font-size: 22px;
  line-height: 1.28;
  color: #fff;

  ${media.tablet`
    font-size: 20px;

    * {
      display: inline;
    }
  `}

  ${media.phablet`
    font-size: 18px;
  `}
`
