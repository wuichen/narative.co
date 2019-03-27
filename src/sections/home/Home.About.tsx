import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

const aboutNarativeText = [
  `Even the most brilliant companies hit points where their focus is
  spread thin by the many challenges that growing businesses face,
  blocking them from reaching their full potential. That's where we
  come in.`,
  `Narative brings focus through the lens of a team that’s faced it
  all before, at scrappy startups and established enterprises alike.
  That’s why we don’t do big pitches or presentations — it’s just
  not in our DNA.`,
  `Instead, we take the time to understand what drives your company
  and customers as if they were our own, uncovering every problem
  and opportunity along the way.
  <strong>Then we get straight to work</strong>.`,
]

const imageQuery = graphql`
  query ShapeImageQuery {
    shape: file(name: { regex: "/mobile-header-backslash/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const HomeAbout = () => (
  <StaticQuery
    query={imageQuery}
    render={({ shape }) => (
      <Gradient>
        <MobileContainer>
          <Media critical src={shape.childImageSharp.fluid} />
        </MobileContainer>
        <MobileSpacer />
        <IntersectionObserver
          render={({ visible, exiting, boundingClientRect }) => (
            <Grid
              narrow
              visible={visible && boundingClientRect.top > -200}
              exiting={exiting}
            >
              <Sticky
                height="682px"
                top={140}
                disableOnMobile
                render={() => (
                  <AboutHeading>The Narative Approach</AboutHeading>
                )}
              />
              <div>
                {aboutNarativeText.map(text => (
                  <IntersectionObserver
                    key={text}
                    render={({ visiblePercentage }) => (
                      <Text
                        style={{ opacity: visiblePercentage / 100 }}
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    )}
                  />
                ))}
              </div>
            </Grid>
          )}
        />
      </Gradient>
    )}
  />
)

export default HomeAbout

const Gradient = styled.div`
  position: relative;
  z-index: 3;
  background: #08080b;
  background: linear-gradient(#08080b 60%, #101216 100%);

  ${mediaqueries.tablet`
    background: linear-gradient(180deg,#121318 70%,#101216 100%);
  `};
`
const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 135px 670px;
  grid-column-gap: 128px;
  padding-top: 100px;
  padding-bottom: 30px;
  z-index: 1;
  pointer-events: none;

  ${mediaqueries.tablet`
    padding-top: 80px;
    display: block;
    padding-bottom: 100;

    &::after {
      content: none;
    }
  `}

  &::after {
    content: '';
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 200px;
    background: linear-gradient(transparent, #08080b);
    opacity ${p => (p.visible ? 1 : 0)};
    transition: opacity ${p => (p.exiting ? '0.8s' : '0')};
    pointer-events: none;
  }
`

const Text = styled.p`
  position: relative;
  top: 70px;
  font-size: 32px;
  color: #fff;

  padding-top: 280px;
  margin-top: -350px;

  padding-bottom: 140px;
  margin-bottom: -70px;

  ${mediaqueries.tablet`
    font-size: 22px;
    top: 0;
    margin: 0;
    padding: 0 0 40px 0;
  `};
`

const AboutHeading = styled(Heading.h2)`
  position: relative;
  color: ${p => p.theme.colors.grey};
`

const MobileContainer = styled.div`
  position: absolute;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: -100px;
    width: 100%;
    height: 300px;
    background: linear-gradient(transparent, #08080b 33%, #15161c);
  }

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const MobileSpacer = styled.div`
  ${mediaqueries.tablet_up`
    display: none;
  `}

  ${mediaqueries.phablet`
    height: 700px;
  `}

  ${mediaqueries.phone`
    height: 600px;
  `}
`
