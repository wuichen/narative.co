import React, { useContext, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

import Section from '@components/Section'
import ButtonPill from '@components/Button/Button.Pill'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'
import { getOffsetTop } from '@utils'

function AboutContact() {
  const [inView, setInView] = useState(false)
  const { toggleContact } = useContext(ContactContext)
  const ref = useRef()

  useEffect(() => {
    const handleScroll = throttle(() => {
      setInView(window.pageYOffset + 100 > getOffsetTop(ref.current))
    }, 50)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ref])
  return (
    <>
      <LightLayer style={{ opacity: inView ? 1 : 0 }} />
      <Container data-scroll-fade={true} inView={inView} ref={ref}>
        <Section narrow>
          <Heading inView={inView}>
            That’s our story. <Grey>What's yours?</Grey>
          </Heading>
          <ButtonContainer>
            <ButtonPill text="Contact us" onClick={toggleContact} mode="dark" />
          </ButtonContainer>
        </Section>
      </Container>
    </>
  )
}

export default AboutContact

const Container = styled.div<{ inView: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  position: relative;
  height: calc(100vh - 310px);
  z-index: 2;

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
    padding-top: 0;
    height: 90vh;
    align-items: center;
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

const LightLayer = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d8d7d8;
  z-index: 1;
  transition: opacity 1s;

  ${media.tablet`
    &::before {
      content: '';
      position: absolute;
      height: 549px;
      bottom: -549px;
      background: #d8d7d8;
      z-index: 1;
    }
  `}
`
