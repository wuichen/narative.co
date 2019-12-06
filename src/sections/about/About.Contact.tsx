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
          <MobileLogoContainer style={{ opacity: inView ? 1 : 0 }}>
            <MobileLogo aria-hidden="true" />
          </MobileLogoContainer>
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
  height: calc(100vh - 290px);
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
    height: 80vh;
    align-items: center;
    padding: 0;
  `}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto 3vh;

  ${media.phablet`
    margin: 70px auto 3vh;
  `}
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

const MobileLogoContainer = styled.div`
  text-align: center;
  margin-bottom: 70px;
  transition: opacity 1s;

  ${media.tablet_up`
    display: none;
  `}
`

const MobileLogo = () => (
  <svg
    width="23px"
    height="30px"
    viewBox="0 0 23 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Narative</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 30H22.9091V26.4595H0V30Z"
      fill="black"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.00610352 24.7176L7.01994 19.7873L7.01909 15.2965L0.00610352 10.3745V24.7176Z"
      fill="black"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.8919 0L15.8494 4.87412V9.29375L22.8941 14.2569L22.892 0H22.8919Z"
      fill="black"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.0065918 0V8.62637L22.8961 24.7297L22.8948 16.0316L0.0065918 0Z"
      fill="black"
      fillOpacity="0.25"
    />
  </svg>
)
