import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import media from '@styles/media'
import { clamp, useResize } from '@utils'

import AboutHeading from './About.Heading'

const BACKGROUND_COLOR_BLENDS = [
  '#1D2128',
  '#1C1F26',
  '#1A1E24',
  '#191C23',
  '#181B21',
  '#17191F',
  '#15181D',
  '#14161B',
  '#131519',
  '#121318',
  '#101216',
  '#0F1014',
]

const companyLogosQuery = graphql`
  {
    BDCLogo: file(name: { regex: "/testimonial-company-logo-bdc/" }) {
      publicURL
    }
    flowLogo: file(name: { regex: "/testimonial-company-logo-flow/" }) {
      publicURL
    }
    gatsbyLogo: file(name: { regex: "/testimonial-company-logo-gatsby/" }) {
      publicURL
    }
    netlifyLogo: file(name: { regex: "/testimonial-company-logo-netlify/" }) {
      publicURL
    }
  }
`

function AboutTestimonial() {
  const { BDCLogo, flowLogo, gatsbyLogo, netlifyLogo } = useStaticQuery(
    companyLogosQuery
  )
  const { height, width } = useResize()

  const testimonials = [
    {
      name: 'Kyle Mathews',
      title: 'CEO',
      testimonial:
        "Our mission at Gatsby is to empower digital creators to build fast, responsive experiences — and Narative does so in ways that are consistently beautiful and inspiring. We're always excited to see what they build, and grateful for their contributions to the Gatsby community.",
      logo: gatsbyLogo,
    },
    {
      name: 'David Lorem',
      title: '[title]',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in lectus at augue feugiat imperdiet et quis erat. Fusce placerat, nulla in dapibus bibendum, nunc ex dignissim urna, sed aliquam felis. Phasellus in lectus at augue feugiat imperdiet et quis erat.',
      logo: BDCLogo,
    },
    {
      name: 'Shawn Wang',
      title: 'Developer Experience',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in lectus at augue feugiat imperdiet et quis erat. Fusce placerat, nulla in dapibus bibendum, nunc ex dignissim urna, sed aliquam felis. Phasellus in lectus at augue feugiat imperdiet et quis erat.',
      logo: netlifyLogo,
    },
    {
      name: 'Peter Bailey',
      title: 'Partner',
      testimonial:
        'I never hesitate to recommend that startups at any stage reach out and talk to the Narative team. Not only are they brilliant professionals in each of their fields, they approach every conversation with thoughtfulness and sincerity.',
      logo: flowLogo,
    },
  ]

  return (
    <Sticky
      cover
      height="2400px"
      render={({ progress }: StickyState) => {
        const five = progress * 2.5
        const textStyles = `opacity: ${1 - five}; filter: blur(${five *
          2}px); will-change: opacity, filter;`

        return (
          <AboutTestimonialContainer>
            <HeadingLineBreak>
              <AboutHeading
                heading="Independent, but never alone"
                text={`
                  <div style="${textStyles}">
                    While we like to do things our own way, nobody can do it all
                    by themselves.
                    <div style="color:#73737D">
                      Narative believes in building ongoing partnerships based
                      on trust, and in contributing our ideas and work to the
                      open source community. When we do honest work, good word
                      spreads, and we can all build ever-greater things.
                    </div>
                  </div>`}
              />
            </HeadingLineBreak>
            <Section narrow>
              <TestimonialCardContainer>
                {testimonials.map((testimonial, index) => {
                  const total = testimonials.length
                  const nextIndex = index + 1
                  const previousIndex = index - 1
                  const minZeroMaxOne = (num: number) => clamp(num, 0, 1)

                  const prevStaggered = minZeroMaxOne(
                    progress - previousIndex / total
                  )
                  const currentStaggered = minZeroMaxOne(
                    progress - index / total
                  )
                  const nextStaggered = minZeroMaxOne(
                    progress - nextIndex / total
                  )

                  const prevProgress = minZeroMaxOne(prevStaggered * total)
                  const currentProgress = minZeroMaxOne(
                    currentStaggered * total
                  )
                  const nextProgress = minZeroMaxOne(nextStaggered * total)

                  const transalteYFirst =
                    currentProgress * (index === 0 ? 100 : 450)

                  const transalteYSecond =
                    transalteYFirst + nextProgress * 22 * (total - nextIndex)

                  const scaleCurve = 1 - nextStaggered * 0.25

                  const selectedBlend = Math.round(
                    ((((1 - scaleCurve) * 100) / 9) * 10) / 2
                  )

                  return (
                    <TestimonialCard
                      data-card={index}
                      key={testimonial.name}
                      style={{
                        transform: `translateY(-${transalteYSecond}px) scale(${scaleCurve})`,
                        opacity: prevProgress,
                      }}
                    >
                      <Card
                        style={{
                          background: BACKGROUND_COLOR_BLENDS[selectedBlend],
                        }}
                      >
                        <LogoContainer>
                          <SVG src={testimonial.logo.publicURL} />
                        </LogoContainer>
                        <VerticalDivider />
                        <div>
                          <Role>
                            {testimonial.name} · {testimonial.title}
                          </Role>
                          <Text>{testimonial.testimonial}</Text>
                        </div>
                      </Card>
                    </TestimonialCard>
                  )
                })}
              </TestimonialCardContainer>
            </Section>
          </AboutTestimonialContainer>
        )
      }}
    />
  )
}

export default React.memo(AboutTestimonial)

const AboutTestimonialContainer = styled.div`
  position: relative;
  padding-top: 10vh;
  height: 100vh;

  &::after {
    content: '';
    position: absolute;
    height: 30vh;
    min-height: 300px;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #0b0c0f 70%);
    pointer-events: none;

    @media (min-height: 1200px) {
      height: 45vh;
      min-height: 300px;
      background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #0b0c0f 20%);
    }

    ${media.tablet`
      height: 20vh;
      min-height: 100px;
    `}
  }
`

const TestimonialCardContainer = styled.ul`
  position: relative;
  max-width: 750px;
  margin: 90px auto 0;
  list-style: none;
`

const TestimonialCard = styled.li`
  will-change: transform, opacity;
  top: 350px;
  height: 350px;
  position: absolute;

  &:first-child {
    top: 0;
  }
`

const Card = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  border-radius: 5px;
  background: #1d2128;
  padding: 40px 40px 40px 0;
  font-size: 18px;
  box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
  transition: background 0.1s;

  ${media.tablet`
    flex-direction: column;
    text-align: center;
    height: auto;

    padding: 30px 30px 0;
  `}

  ${media.phablet`
    padding: 30px 15px 0;
  `}
`

const LogoContainer = styled.div`
  ${media.tablet`
    order: 3;
  `}
`

const Role = styled.div`
  font-weight: 700;
  color: #fff;

  ${media.tablet`
    margin-bottom: 25px;
  `}
`

const Text = styled.p`
  color: ${p => p.theme.colors.grey};

  ${media.tablet`
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(250, 250, 250, 0.05);
  `}

  ${media.phablet`
    font-size: 16px;
  `}
`

const VerticalDivider = styled.div`
  height: 120px;
  width: 5px;
  margin-right: 40px;
  background: rgba(250, 250, 250, 0.05);

  ${media.tablet`
    display: none;
  `}
`

const HeadingLineBreak = styled.div`
  h2 {
    width: 70%;
    display: block;

    ${media.tablet`
      width: 80%;
    `}

    ${media.phone`
      width: 90%;
    `}
  }
`
