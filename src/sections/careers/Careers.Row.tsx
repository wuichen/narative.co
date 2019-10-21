import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import media from '@styles/media'

/**
 * <CareerRow />
 * A generic component specifically used on the Careers page. This will
 * implement the standard Left Heading with Right Text/Content
 *
 * [Heading]    [...........................]
 *              [..........Content..........]
 *              [...........................]
 */

const CareerRow = ({
  children,
  header,
  hideOverflow,
}: {
  children: React.ReactNode
  header: string
  hideOverflow?: boolean
}) => (
  <CareerRowSpacer data-scroll-fade={true}>
    <Section hideOverflow={hideOverflow} narrow>
      <CareerRowContainer>
        <CareerRowHeader>{header}</CareerRowHeader>
        <CareerRowContent>{children}</CareerRowContent>
      </CareerRowContainer>
    </Section>
  </CareerRowSpacer>
)

export default CareerRow

const CareerRowSpacer = styled.div`
  padding-bottom: 20rem;
  overflow-x: hidden;

  ${media.desktop_large`
    padding-bottom: 15rem;
  `};

  ${media.desktop`
    padding-bottom: 10rem;
  `};

  ${media.tablet`
    padding-bottom: 6rem;
  `};
`

const CareerRowContainer = styled.div`
  display: flex;

  ${media.desktop`
    flex-direction: column;
  `};
`

const CareerRowHeader = styled(Heading.h2)`
  align-self: flex-start;
  font-size: 3.2rem;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${media.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${media.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const CareerRowContent = styled.div`
  flex: 1;
`
