import React, { useContext } from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import ButtonPill from '@components/Button/Button.Pill'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'

function AboutContact({ inView }: { inView: boolean }) {
  const { toggleContact } = useContext(ContactContext)

  return (
    <Container data-scroll-fade={true} inView={inView}>
      <Section narrow>
        <Heading inView={inView}>
          That's our story. <Grey>What's yours?</Grey>
        </Heading>
        <ButtonContainer>
          <ButtonPill text="Contact us" onClick={toggleContact} mode="dark" />
        </ButtonContainer>
      </Section>
    </Container>
  )
}

export default AboutContact

const Container = styled.div<{ inView: boolean }>`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: calc(100vh - 400px);
  padding-top: 400px;
  margin-bottom: -310px;
  padding-bottom: 310px;

  ${p =>
    !p.inView &&
    `
    button {
      border: 1px solid #fafafa;
    }
  `}

  @media (min-height: 1200px) {
    padding-top: 310px;
    align-items: center;
  }

  ${media.tablet`
    padding-top: 300px;
    margin-bottom: -200px;
    padding-bottom: 200px;
  `}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto 3vh;
`

const Heading = styled.h2<{ inView: boolean }>`
  font-size: 70px;
  text-align: center;
  width: 100%;
  max-width: 749px;
  margin: 0 auto;
  line-height: 1.05;
  letter-spacing: -0.5px;
  color: ${p => (p.inView ? p.theme.colors.kepler : '#fff')};
  font-family: ${p => p.theme.fontfamily.serif};
  transition: color 1s;

  ${media.tablet`
    font-size: 60px;
  `}

  ${media.phablet`
    font-size: 40px;
  `}
`

const Grey = styled.div`
  color: ${p => p.theme.colors.grey};
`
