import React, { useContext } from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import ButtonPill from '@components/Button/Button.Pill'
import { ContactContext } from '@components/Contact/Contact.Context'

function AboutContact({ inView }: { inView: boolean }) {
  const { toggleContact } = useContext(ContactContext)

  return (
    <Container>
      <Section>
        <Heading>
          Lorem ipsum dolor sit amet,{' '}
          <Grey inView={inView}>
            consectetur adipiscing elit phasellus in lectus at aug.
          </Grey>
        </Heading>
        <ButtonContainer>
          <ButtonPill text="Contact us" onClick={toggleContact} mode="dark" />
        </ButtonContainer>
      </Section>
    </Container>
  )
}

export default AboutContact

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: calc(100vh - 310px);
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto 0;
`

const Heading = styled.h2`
  font-size: 70px;
  text-align: center;
  width: 100%;
  max-width: 945px;
  margin: 0 auto;
  line-height: 1.05;
  letter-spacing: -0.5px;
  color: ${p => p.theme.colors.kepler};
  font-family: ${p => p.theme.fontfamily.serif};
`

const Grey = styled.span<{ inView: boolean }>`
  color: ${p => (p.inView ? p.theme.colors.grey : p.theme.colors.kepler)};
  transition: color 1.5s;
  will-change: opacity;
`
