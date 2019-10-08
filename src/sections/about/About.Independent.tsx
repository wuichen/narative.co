import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky from '@components/Sticky'
import mediaqueries from '@styles/media'

import AboutHeading from './About.Heading'

const testimonials = [
  {
    name: 'Kyle Mathews',
    title: 'CEO',
    testimonial:
      "Our mission at Gatsby is to empower digital creators to build fast, responsive experiences — and Narative does so in ways that are consistently beautiful and inspiring. We're always excited to see what they build, and grateful for their contributions to the Gatsby community.",
    logo: () => {},
  },
  {
    name: 'David Lorem',
    title: '[title]',
    testimonial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in lectus at augue feugiat imperdiet et quis erat. Fusce placerat, nulla in dapibus bibendum, nunc ex dignissim urna, sed aliquam felis. Phasellus in lectus at augue feugiat imperdiet et quis erat.',
    logo: () => {},
  },
  {
    name: 'Peter Bailey',
    title: 'Partner',
    testimonial:
      'I never hesitate to recommend that startups at any stage reach out and talk to the Narative team. Not only are they brilliant professionals in each of their fields, they approach every conversation with thoughtfulness and sincerity.',
    logo: () => {},
  },
]

function AboutChoose() {
  return (
    <Sticky
      cover
      height="3000px"
      render={() => (
        <div>
          <AboutHeadingSpacer>
            <HeadingLineBreak>
              <AboutHeading
                heading="Independent, but never alone"
                text="While we like to do things our own way, nobody can do it all by themselves. <div style='color:#73737D'>Narative believes in building ongoing partnerships based on trust, and in contributing our ideas and work to the open source community. When we do honest work, good word spreads, and we can all build ever-greater things.</div>"
              />
            </HeadingLineBreak>
            <Section narrow>
              <TestimonialCardContainer>
                {testimonials.map((t, index) => (
                  <TestimonialCard style={{ top: `${index * 50}px` }}>
                    <div>Logo</div>
                    <div>
                      <div>
                        {t.name}, {t.title}
                      </div>
                      <div>{t.testimonial}</div>
                    </div>
                  </TestimonialCard>
                ))}
              </TestimonialCardContainer>
            </Section>
          </AboutHeadingSpacer>
        </div>
      )}
    />
  )
}

export default AboutChoose

const AboutHeadingSpacer = styled.div`
  padding-bottom: 300px;

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

const TestimonialCardContainer = styled.div`
  position: relative;
  max-width: 750px;
  margin: 90px auto 0;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 200px;
    width: 93.7%;
    background: #16181e;
    border-radius: 5px;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -35px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 200px;
    width: 87.8%;
    background: rgba(18, 19, 24, 0.5);
    border-radius: 5px;
    z-index: 0;
  }

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

const TestimonialCard = styled.div`
  position: absolute;
  display: flex;
  height: 200px;
  width: 100%;
  border-radius: 5px;
  background: #1d2128;
  padding: 40px;
  font-size: 18px;
  color: ${p => p.theme.colors.grey};
  z-index: 2;
`
