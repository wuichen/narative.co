import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import mediaqueries from '@styles/media'

/**
 * <AboutRow />
 * A generic component specifically used on the Abouts page. This will
 * implement the standard Left Heading with Right Text/Content
 *
 * [Heading]    [...........................]
 *              [..........Content..........]
 *              [...........................]
 */

const people = [
  { name: 'Thiago Costa', role: 'Brand and Design' },
  { name: 'Thiago Costa', role: 'Brand and Design' },
  { name: 'Thiago Costa', role: 'Brand and Design' },
  { name: 'Thiago Costa', role: 'Brand and Design' },
  { name: 'Thiago Costa', role: 'Brand and Design' },
  { name: 'Thiago Costa', role: 'Brand and Design' },
]

function AboutTeam() {
  return (
    <AboutTeamContainer>
      <div>
        <AboutRow header="The team">
          <TeamText>
            <Text>
              One thing we’ve learned from our years within growing startups is
              that throwing more people at a problem rarely hastens solving it.
            </Text>
            <Text>
              We keep our team intentionally small, bringing on only those with
              the skills, experience and enthusiasm required to create real
              impact — both for our business, and for yours.
            </Text>
          </TeamText>
        </AboutRow>
        <Section narrow>
          <TeamCardsContainer>
            {people.map(person => (
              <div>
                <div>{person.name}</div>
                <div>{person.role}</div>
              </div>
            ))}
          </TeamCardsContainer>
        </Section>
      </div>
      <div>
        <AboutRow header="History">
          <HistoryText>
            <Text>
              We founded Narative to have the freedom to both pursue our own
              ambitions and help businesses we believe in pursue theirs,
              applying everything we’ve learned working within and alongside
              companies like:
            </Text>
          </HistoryText>
          <CompanyLogos>This is company logos</CompanyLogos>
        </AboutRow>
      </div>
    </AboutTeamContainer>
  )
}

export default AboutTeam

function AboutRow({
  children,
  header,
  hideOverflow,
}: {
  children: React.ReactNode
  header: string
  hideOverflow?: boolean
}) {
  return (
    <AboutRowSpacer data-scroll-fade={true}>
      <Section hideOverflow={hideOverflow} narrow>
        <AboutRowContainer>
          <AboutRowHeader>{header}</AboutRowHeader>
          <AboutRowContent>{children}</AboutRowContent>
        </AboutRowContainer>
      </Section>
    </AboutRowSpacer>
  )
}

const AboutTeamContainer = styled.div`
  padding: 0 0 240px;
`

const AboutRowSpacer = styled.div`
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

const AboutRowContainer = styled.div`
  display: flex;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const AboutRowHeader = styled(Heading.h2)`
  align-self: flex-start;
  font-size: 3.2rem;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${mediaqueries.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${mediaqueries.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const AboutRowContent = styled.div`
  flex: 1;
`

const TeamText = styled.div`
  display: grid;
  grid-template-columns: 261px 361px;
  grid-column-gap: 57px;
  margin-bottom: 95px;
`

const HistoryText = styled.div`
  max-width: 681px;
`

const Text = styled.p`
  font-size: 22px;
  line-height: 28px;
  color: #fafafa;
`

const CompanyLogos = styled.div`
  margin-top: 80px;
  height: 30px;
  background: #fafafa;
`

const TeamCardsContainer = styled.div`
  display: flex;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  padding-bottom: 1rem;
  margin-left: 26.3rem;
  width: 100%;
  margin-bottom: 180px;
`
