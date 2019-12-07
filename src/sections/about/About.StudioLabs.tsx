import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import usePortal from 'react-useportal'
import { Link, useStaticQuery, graphql } from 'gatsby'
import OutsideClickHandler from 'react-outside-click-handler'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Image from '@components/Image'

import media from '@styles/media'
import { scrollable } from '@utils'
import { ExIcon } from '../../icons/ui/index'

export const labsImageQuery = graphql`
  {
    labsHero: file(name: { regex: "/studiolabs-device-modal/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboutStudioLabs() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      scrollable('disable')

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setIsOpen(false)
          scrollable('enable')
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    } else {
      scrollable('enable')
    }
  }, [isOpen])

  return (
    <>
      <Container>
        <Section narrow>
          <Blocks>
            <Block>
              <BlockInner>
                <NarativeStudioLogo />
                <p>Product design, development and marketing services</p>
              </BlockInner>
            </Block>
            <Block pad>
              <BlockInner>
                <NarativeLabsLogo />
                <p>Internal product incubator exploring untapped markets</p>
              </BlockInner>
            </Block>
            <ButtonMobile onClick={() => setIsOpen(true)}>
              Learn more
            </ButtonMobile>
          </Blocks>
          <div></div>
        </Section>
        <Button onClick={() => setIsOpen(true)}>Learn more</Button>
      </Container>
      <AboutStudioLabsModal
        isOpen={isOpen}
        handleOutsideClick={() => setIsOpen(false)}
      />
    </>
  )
}

function AboutStudioLabsModal({
  isOpen,
  handleOutsideClick,
}: {
  isOpen: boolean
  handleOutsideClick: () => void
}) {
  const { Portal } = usePortal()
  const { labsHero } = useStaticQuery(labsImageQuery)

  const modalStyles = isOpen
    ? { opacity: 1, transition: `opacity 0s ease 0.4s` }
    : { opacity: 0, pointerEvents: 'none' }

  return (
    <>
      {isOpen && (
        <Portal>
          <Modal style={modalStyles}>
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <ModalContent>
                <CloseButton onClick={handleOutsideClick}>
                  <ExIcon fill="#fff" />
                </CloseButton>
                <ModalGrid>
                  <ModalAbout>
                    <ModalName>About Narative Labs</ModalName>
                    <ModalRole>—</ModalRole>
                    <ModalText index={0}>
                      Alongside partnering with select companies to help design,
                      develop, and market their products, we’re also building a
                      few things of our very own. Some are open-source
                      experiments; others are full-fledged consumer products,
                      coming to market soon.
                    </ModalText>

                    <ModalText index={1}>
                      Why do things this way? To start, we just can’t help it;
                      we love to tinker. It also provides us with real revenue,
                      while allowing us to retain control of our company.
                    </ModalText>
                    <ModalText index={2}>
                      But most importantly, it continuously exposes us to new
                      technologies and ideas, heightening the quality and
                      potential of everything we create — no matter who it’s
                      for.
                    </ModalText>
                    <ModalLink to="/labs">
                      See our products <InternalLinkIcon />
                    </ModalLink>
                  </ModalAbout>
                  <MediaAnimator>
                    <Image src={labsHero.childImageSharp.fluid} />
                  </MediaAnimator>
                </ModalGrid>
              </ModalContent>
            </OutsideClickHandler>
          </Modal>
        </Portal>
      )}
    </>
  )
}

export default AboutStudioLabs

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 140px;

  @media (max-width: 880px) {
    padding-bottom: 45px;
  }

  ${media.phablet`
    padding: 60px 0;
  `}
`

const Blocks = styled.div`
  position: relative;
  display: flex;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    height: 1px;
    width: 200%;
    background: ${p => p.theme.colors.purple};
  }

  @media (max-width: 880px) {
    display: block;
    padding-left: 30px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 95%;
      top: 5%;
      width: 1px;
    }
  }
`

const Block = styled.div<{ pad: boolean }>`
  position: relative;
  max-width: 264px;
  background: #0a0a0d;

  p {
    font-size: 22px;
    color: ${p => p.theme.colors.grey};
    margin-top: 20px;
  }

  &:first-child {
    margin-right: 20%;
  }

  ${p => p.pad && ` padding-left: 2%;`}

  ${media.desktop`
    &:first-child {
      margin-right: 10%;
    }
  `}

  @media (max-width: 880px) {
    margin-bottom: 45px;

    &:last-child {
      padding-left: 0;
    }

    ${p => p.pad && ` padding-left: 0;`}

    &::before {
      content: '';
      position: absolute;
      left: -35px;
      top: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${p => p.theme.colors.purple};
      box-shadow: 0 0 0 10px #090a0d;
    }

    &::after {
      content: '';
      position: absolute;
      left: -34px;
      top: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #090a0d;
    }
  }
`

const BlockInner = styled.div`
  position: relative;
  background: #0a0a0d;
  width: 100%;
`

const Button = styled.button`
  position: absolute;
  right: 10%;
  top: 6px;
  border-radius: 100px;
  border: 1px solid ${p => p.theme.colors.purple};
  color: ${p => p.theme.colors.purple};
  background: #131322;
  font-size: 12px;
  height: 20px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  ${media.desktop`
    right: 5%;
  `}

  @media (max-width: 880px) {
    display: none;
  }
`

const ButtonMobile = styled.button`
  display: none;
  position: relative;
  color: ${p => p.theme.colors.purple};
  font-size: 18px;
  font-weight: 700;
  text-decoration: underline;

  &::before {
    content: '';
    position: absolute;
    left: -35px;
    top: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${p => p.theme.colors.purple};
    box-shadow: 0 0 0 10px #090a0d;
  }

  &::after {
    content: '';
    position: absolute;
    left: -34px;
    top: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #090a0d;
  }

  @media (max-width: 880px) {
    display: block;
  }
`

const fadeInAndUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const CloseButton = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 30px;
  left: 30px;
  z-index: 1;

  ${media.phablet`
    top: 16px;
    left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background: #000;
      border-radius: 50%;
      z-index: 0;
    }
  `}

  svg {
    position: relative;
  }
`

const fadeInAndUpModal = keyframes`
  from { opacity: 0; transform:  translateY(20px) scale(0.94); }
  to { opacity: 1; transform: translateY(0); }
`

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  z-index: 10;

  backdrop-filter: blur(10px);

  & > div {
    flex: 1;
    max-width: 1100px;
    max-height: 630px;
    height: 100%;
  }

  ${media.phablet`
    padding: 15px;
    & > div {
      max-height: 92vh;
    }
  `}
`

const ModalContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 630px;
  max-width: 1140px;
  height: 100%;
  width: 100%;
  background: #000;
  border-radius: 5px;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.2);
  animation: ${fadeInAndUpModal} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
    forwards;

  ${media.tablet`
    max-height: 92vh;
  `}
`

const ModalGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalAbout = styled.div`
  max-height: 92vh;
  width: 100%;
  max-width: 480px;
  margin: 30px 0 0 25px;

  ${media.desktop_small`
    max-width: initial;
    padding: 40px 80px;
    margin: 0 auto;
  `}
  
  ${media.tablet`
    padding: 30px;
    overflow: scroll;
  `}

  ${media.phablet`
    padding: 60px 20px;
  `}
`

const ModalRole = styled.div`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms
    forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const ModalText = styled.p<{ index: number }>`
  color: #fff;
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 100 + 300}ms forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const ModalLink = styled(Link)`
  display: block;
  color: ${p => p.theme.colors.gold};
  font-size: 18px;
  font-weight: 600;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 500ms
    forwards;

  svg {
    margin: 0 0 4px 4px;
  }
`

const ModalName = styled(Heading.h2)`
  margin-bottom: 5px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 200ms
    forwards;
`

const MediaAnimator = styled.div`
  width: 472px;
  margin-left: 35px;
  padding-left: 5%;
  flex: 1;
  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;

  ${media.desktop_small`
    display: none;
  `}
`

const NarativeLabsLogo = () => (
  <svg
    width="181"
    height="28"
    viewBox="0 0 181 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M139.29 2.39723L137.349 2.10606V0.941406H141.182V20.9832L143.123 21.2258V22.2692H137.349V21.2258L139.29 20.9832V2.39723Z"
      fill="#7A8085"
    />
    <path
      d="M156.348 22.1949C155.814 22.4375 155.062 22.5589 154.504 22.5589C153.315 22.5589 152.611 21.928 152.514 20.7876C151.689 21.6854 150.5 22.5589 148.656 22.5589C146.108 22.5589 144.531 21.2486 144.531 18.3613C144.531 15.0857 146.545 13.8239 150.913 13.8239H152.417V12.0284C152.417 10.4028 151.859 9.14107 149.991 9.14107C148.438 9.14107 147.055 9.62634 145.72 10.2815L145.162 9.1168C146.594 8.29184 148.341 7.63672 150.403 7.63672C153.048 7.63672 154.382 8.87417 154.382 11.8829V19.8899C154.382 21.1273 154.795 21.2972 156.202 21.2486L156.348 22.1949ZM152.417 19.4531V14.9886H151.131C147.831 14.9886 146.424 15.6923 146.424 18.1671C146.424 20.2781 147.394 21.1273 148.899 21.1273C150.549 21.1516 151.568 20.4722 152.417 19.4531Z"
      fill="#7A8085"
    />
    <path
      d="M158.653 2.39723L156.712 2.10606V0.941406H160.546V9.70059C161.565 8.56019 163.045 7.61391 164.719 7.61391C167.534 7.61391 169.644 9.50648 169.644 15.0386C169.644 20.5464 167.558 22.5361 164.476 22.5361C162.705 22.5361 161.298 21.5898 160.376 20.5464L159.963 22.2449H158.653V2.39723ZM167.631 15.2327C167.631 10.7439 166.684 9.14252 164.428 9.14252C162.826 9.14252 161.637 10.016 160.57 10.9866V19.3333C161.589 20.3038 162.851 21.153 164.258 21.153C166.611 21.153 167.631 19.3575 167.631 15.2327Z"
      fill="#7A8085"
    />
    <path
      d="M171.634 21.467V18.5796H172.944L173.381 20.7876C174.133 21.103 174.715 21.2972 175.88 21.2972C177.991 21.2972 179.01 20.3266 179.01 18.6282C179.01 16.9297 178.185 16.2746 175.856 15.5952C173.623 14.9158 171.973 13.9695 171.973 11.3248C171.973 9.33517 173.405 7.63672 176.317 7.63672C177.991 7.63672 179.325 7.95215 180.296 8.53447V11.3491H179.01L178.525 9.28665C177.894 8.99548 177.19 8.89843 176.389 8.89843C174.715 8.89843 173.648 9.72339 173.648 11.1549C173.648 12.6593 174.473 13.2416 176.511 13.8482C178.864 14.6004 180.83 15.4011 180.83 18.4583C180.83 21.1516 178.864 22.5346 175.856 22.5346C174.084 22.5346 172.629 22.1464 171.634 21.467Z"
      fill="#7A8085"
    />
    <path
      d="M44.4432 12.2962C44.4432 10.7918 44.0307 10.2095 42.8903 10.2095C41.944 10.2095 40.7794 10.7433 39.9786 11.3984V20.2546L41.6286 20.473V22.1472H35.0774V20.473L36.7758 20.2546V10.3065L35.0774 9.94259V7.97724H39.4448L39.8088 9.62716C41.0948 8.38972 42.5263 7.61328 44.2491 7.61328C46.36 7.61328 47.6217 8.8022 47.6217 11.2528V20.2546L49.3202 20.473V22.1472H44.4432V12.2962Z"
      fill="#FAFAFA"
    />
    <path
      d="M71.8853 20.4987V22.1729H64.679V20.4987L66.3774 20.2803V10.3322L64.679 9.96828V8.00293H68.9736L69.4104 10.2352C70.3809 8.73084 71.5941 7.6875 73.3653 7.6875C73.5595 7.6875 73.7778 7.71176 73.9234 7.76029L73.5109 11.1087C73.1955 10.9631 72.8558 10.9146 72.4191 10.9146C71.3029 10.9146 70.4537 11.23 69.5802 11.9822V20.2318L71.8853 20.4987Z"
      fill="#FAFAFA"
    />
    <path
      d="M88.1907 7.97721H89.7678V4.43472L92.5581 3.82812V8.00147H95.3242V10.1367H92.5581V18.7745C92.5581 19.8179 92.9463 20.2789 93.7956 20.2789C94.3294 20.2789 94.8874 20.109 95.2514 19.9149L95.7609 21.8318C95.0815 22.22 94.111 22.5354 92.7037 22.5354C90.7626 22.5354 89.7678 21.6134 89.7678 19.187V10.1367H88.1907V7.97721Z"
      fill="#FAFAFA"
    />
    <path
      d="M103.865 20.4745V22.1487H97.2654V20.4745L98.9638 20.2561V10.308L97.2654 9.94405V7.97869H102.167V20.2561L103.865 20.4745ZM98.43 2.93185C98.43 1.81572 99.3035 0.917969 100.42 0.917969C101.536 0.917969 102.409 1.79146 102.409 2.93185C102.409 4.02372 101.536 4.92147 100.395 4.92147C99.3035 4.92147 98.43 4.02372 98.43 2.93185Z"
      fill="#FAFAFA"
    />
    <path
      d="M112.818 9.92156V7.98047H118.205V9.94582L116.919 10.1642L112.818 22.1747H109.785L105.685 10.1399L104.471 9.94582V7.98047H110.465V9.92156L109.057 10.1399L110.998 16.4242C111.362 17.6131 111.532 18.5837 111.726 19.6998H111.751C111.92 18.6079 112.187 17.4676 112.503 16.4L114.347 10.1157L112.818 9.92156Z"
      fill="#FAFAFA"
    />
    <path
      d="M87.0256 20.4245C85.7639 20.4488 85.5213 20.2304 85.5213 19.1143V12.0778C85.5213 8.85073 83.9441 7.61328 80.9112 7.61328C78.7032 7.61328 76.8349 8.2684 75.3305 9.21468L76.2526 11.2043C77.5385 10.5492 78.8002 10.1367 80.2318 10.1367C81.906 10.1367 82.3185 11.0345 82.3185 12.6116V13.4851V13.7035V15.4747V15.596V19.2841C81.7847 19.8664 81.0082 20.3517 79.9164 20.3517C78.7032 20.3517 78.1209 19.7451 78.1209 18.0467C78.1209 16.0813 78.9458 15.5232 81.1053 15.4747V13.7035C76.7136 13.752 74.8938 15.0865 74.8938 18.2408C74.8938 21.2495 76.5437 22.5354 79.0186 22.5354C80.7899 22.5354 81.7604 21.7833 82.5854 20.934C82.8765 22.0744 83.7743 22.5354 84.9875 22.5354C85.861 22.5354 86.6859 22.2928 87.2197 22.0016L87.0256 20.4245Z"
      fill="#FAFAFA"
    />
    <path
      d="M62.8835 20.4245C61.6218 20.4488 61.3792 20.2304 61.3792 19.1143V12.0778C61.3792 8.85073 59.8021 7.61328 56.7691 7.61328C54.5611 7.61328 52.6928 8.2684 51.1885 9.21468L52.1105 11.2043C53.3964 10.5492 54.6582 10.1367 56.0897 10.1367C57.7639 10.1367 58.1764 11.0345 58.1764 12.6116V13.4851V13.7035V15.4747V15.596V19.2841C57.6426 19.8664 56.8662 20.3517 55.7743 20.3517C54.5611 20.3517 53.9788 19.7451 53.9788 18.0467C53.9788 16.0813 54.8037 15.5232 56.9632 15.4747V13.7035C52.5715 13.752 50.7517 15.0865 50.7517 18.2408C50.7517 21.2495 52.4016 22.5354 54.8765 22.5354C56.6478 22.5354 57.6183 21.7833 58.4433 20.934C58.7345 22.0744 59.6322 22.5354 60.8454 22.5354C61.7189 22.5354 62.5438 22.2928 63.0776 22.0016L62.8835 20.4245Z"
      fill="#FAFAFA"
    />
    <path
      d="M123.446 15.7932H130.215V14.5315C130.215 9.43613 128.25 7.64062 124.756 7.64062C121.141 7.64062 118.86 9.80009 118.86 15.0653C118.86 20.4033 121.019 22.5628 125.047 22.5628C127.207 22.5628 128.662 22.0047 130.07 20.8886L129.148 19.2144C128.032 19.918 127.11 20.3548 125.508 20.3548C123.324 20.3548 122.475 19.36 122.281 16.8851C122.233 16.5211 122.208 15.8417 122.208 15.1138C122.208 14.6528 122.208 14.2161 122.233 13.8764V13.8521C122.402 10.6251 123.155 9.58172 124.732 9.58172C126.576 9.58172 127.012 10.6978 127.012 13.8521H123.47V15.7932H123.446Z"
      fill="#FAFAFA"
    />
    <path
      d="M20.8343 24.0391H0.79248V27.1205H20.8343V24.0391Z"
      fill="#FAFAFA"
    />
    <path
      d="M0.79248 10.0156V22.5357L6.93118 18.2167V14.3103L0.79248 10.0156Z"
      fill="#FAFAFA"
    />
    <path
      d="M20.8099 13.3887V0.941406L14.647 5.21181V9.06973L20.8099 13.3887Z"
      fill="#FAFAFA"
    />
    <path
      d="M20.8343 22.5361L20.81 14.9415L0.79248 0.941406V8.4874L20.8343 22.5361Z"
      fill="#FAFAFA"
    />
  </svg>
)

const NarativeStudioLogo = () => (
  <svg
    width="207"
    height="28"
    viewBox="0 0 207 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M139.12 21.467V18.5796H140.43L140.867 20.7876C141.619 21.103 142.201 21.2972 143.366 21.2972C145.477 21.2972 146.496 20.3266 146.496 18.6282C146.496 16.9297 145.671 16.2746 143.342 15.5952C141.109 14.9158 139.459 13.9695 139.459 11.3248C139.459 9.33517 140.891 7.63672 143.803 7.63672C145.477 7.63672 146.811 7.95215 147.782 8.53447V11.3491H146.496L146.011 9.28665C145.38 8.99548 144.676 8.89843 143.875 8.89843C142.201 8.89843 141.134 9.72339 141.134 11.1549C141.134 12.6593 141.959 13.2416 143.997 13.8482C146.35 14.6004 148.316 15.4011 148.316 18.4583C148.316 21.1516 146.35 22.5346 143.342 22.5346C141.546 22.5346 140.09 22.1464 139.12 21.467Z"
      fill="#7A8085"
    />
    <path
      d="M149.723 7.92891H151.446V4.14378L153.338 3.70703V7.92891H156.322V9.23914H153.362V19.5755C153.362 20.6431 153.848 21.1769 154.867 21.1769C155.425 21.1769 156.056 21.007 156.541 20.7644L156.856 21.9048C156.201 22.3173 155.352 22.5599 154.212 22.5599C152.707 22.5599 151.446 21.8562 151.446 19.7453V9.21488H149.723V7.92891Z"
      fill="#7A8085"
    />
    <path
      d="M165.688 9.16713V7.92969H169.522V20.8137L171.463 21.1048V22.2452H168.018L167.751 20.474C166.538 21.6629 164.985 22.5607 163.31 22.5607C161.078 22.5607 159.598 21.3232 159.598 18.7513V9.43403L157.706 9.16713V7.92969H161.539V18.3145C161.539 20.1828 162.291 21.0078 163.771 21.0078C165.082 21.0078 166.465 20.3284 167.605 19.2851V9.43403L165.688 9.16713Z"
      fill="#7A8085"
    />
    <path
      d="M181.824 20.5464C180.902 21.5655 179.446 22.5361 177.747 22.5361C174.714 22.5361 172.725 20.3766 172.725 14.9901C172.725 9.70059 174.933 7.61391 177.844 7.61391C179.519 7.61391 180.732 8.41461 181.727 9.45795V2.39723L179.786 2.10606V0.941406H183.619V20.9104L185.56 21.2016V22.2449H182.115L181.824 20.5464ZM181.727 19.309V10.9623C180.586 9.8219 179.616 9.11826 178.111 9.11826C175.782 9.11826 174.763 10.7439 174.763 15.0386C174.763 19.5759 175.855 21.1288 178.039 21.1288C179.47 21.1045 180.78 20.1825 181.727 19.309Z"
      fill="#7A8085"
    />
    <path
      d="M192.937 21.2031V22.2464H187.21V21.2031L189.103 20.9604V9.43519L187.162 9.16829V7.93085H190.995V20.9847L192.937 21.2031ZM188.375 3.27223C188.375 2.44726 188.982 1.81641 189.806 1.81641C190.631 1.81641 191.262 2.39873 191.262 3.27223C191.262 4.09719 190.631 4.72804 189.806 4.72804C188.982 4.72804 188.375 4.12145 188.375 3.27223Z"
      fill="#7A8085"
    />
    <path
      d="M194.514 15.0857C194.514 9.77192 196.916 7.63672 200.24 7.63672C203.588 7.63672 206.088 9.74766 206.088 15.0614C206.088 20.3751 203.685 22.5589 200.313 22.5589C196.964 22.5346 194.514 20.4237 194.514 15.0857ZM204.049 15.1342C204.049 10.6697 202.885 8.92269 200.313 8.92269C197.692 8.92269 196.576 10.5969 196.576 15.0371C196.576 19.5259 197.741 21.2486 200.313 21.2486C202.909 21.2729 204.049 19.5744 204.049 15.1342Z"
      fill="#7A8085"
    />
    <path
      d="M44.4432 12.2962C44.4432 10.7918 44.0307 10.2095 42.8903 10.2095C41.944 10.2095 40.7794 10.7433 39.9786 11.3984V20.2546L41.6286 20.473V22.1472H35.0774V20.473L36.7758 20.2546V10.3065L35.0774 9.94259V7.97724H39.4448L39.8088 9.62716C41.0948 8.38972 42.5263 7.61328 44.2491 7.61328C46.36 7.61328 47.6217 8.8022 47.6217 11.2528V20.2546L49.3202 20.473V22.1472H44.4432V12.2962Z"
      fill="#FAFAFA"
    />
    <path
      d="M71.8854 20.4987V22.1729H64.6791V20.4987L66.3775 20.2803V10.3322L64.6791 9.96828V8.00293H68.9737L69.4105 10.2352C70.381 8.73084 71.5942 7.6875 73.3655 7.6875C73.5596 7.6875 73.7779 7.71176 73.9235 7.76029L73.5111 11.1087C73.1956 10.9631 72.8559 10.9146 72.4192 10.9146C71.3031 10.9146 70.4538 11.23 69.5803 11.9822V20.2318L71.8854 20.4987Z"
      fill="#FAFAFA"
    />
    <path
      d="M88.1907 7.97721H89.7678V4.43472L92.5581 3.82812V8.00147H95.3242V10.1367H92.5581V18.7745C92.5581 19.8179 92.9463 20.2789 93.7956 20.2789C94.3294 20.2789 94.8874 20.109 95.2514 19.9149L95.7609 21.8318C95.0815 22.22 94.111 22.5354 92.7037 22.5354C90.7626 22.5354 89.7678 21.6134 89.7678 19.187V10.1367H88.1907V7.97721Z"
      fill="#FAFAFA"
    />
    <path
      d="M103.865 20.4745V22.1487H97.2654V20.4745L98.9638 20.2561V10.308L97.2654 9.94405V7.97869H102.167V20.2561L103.865 20.4745ZM98.43 2.93185C98.43 1.81572 99.3035 0.917969 100.42 0.917969C101.536 0.917969 102.409 1.79146 102.409 2.93185C102.409 4.02372 101.536 4.92147 100.395 4.92147C99.3035 4.92147 98.43 4.02372 98.43 2.93185Z"
      fill="#FAFAFA"
    />
    <path
      d="M112.818 9.92156V7.98047H118.205V9.94582L116.919 10.1642L112.818 22.1747H109.785L105.685 10.1399L104.471 9.94582V7.98047H110.465V9.92156L109.057 10.1399L110.998 16.4242C111.362 17.6131 111.532 18.5837 111.726 19.6998H111.751C111.92 18.6079 112.187 17.4676 112.503 16.4L114.347 10.1157L112.818 9.92156Z"
      fill="#FAFAFA"
    />
    <path
      d="M87.0257 20.4245C85.764 20.4488 85.5214 20.2304 85.5214 19.1143V12.0778C85.5214 8.85073 83.9443 7.61328 80.9113 7.61328C78.7033 7.61328 76.835 8.2684 75.3307 9.21468L76.2527 11.2043C77.5387 10.5492 78.8004 10.1367 80.2319 10.1367C81.9061 10.1367 82.3186 11.0345 82.3186 12.6116V13.4851V13.7035V15.4747V15.596V19.2841C81.7848 19.8664 81.0084 20.3517 79.9165 20.3517C78.7033 20.3517 78.121 19.7451 78.121 18.0467C78.121 16.0813 78.946 15.5232 81.1054 15.4747V13.7035C76.7137 13.752 74.8939 15.0865 74.8939 18.2408C74.8939 21.2495 76.5438 22.5354 79.0187 22.5354C80.79 22.5354 81.7605 21.7833 82.5855 20.934C82.8767 22.0744 83.7744 22.5354 84.9876 22.5354C85.8611 22.5354 86.6861 22.2928 87.2199 22.0016L87.0257 20.4245Z"
      fill="#FAFAFA"
    />
    <path
      d="M62.8834 20.4245C61.6217 20.4488 61.3791 20.2304 61.3791 19.1143V12.0778C61.3791 8.85073 59.8019 7.61328 56.769 7.61328C54.561 7.61328 52.6927 8.2684 51.1883 9.21468L52.1104 11.2043C53.3963 10.5492 54.658 10.1367 56.0896 10.1367C57.7638 10.1367 58.1763 11.0345 58.1763 12.6116V13.4851V13.7035V15.4747V15.596V19.2841C57.6425 19.8664 56.866 20.3517 55.7742 20.3517C54.561 20.3517 53.9787 19.7451 53.9787 18.0467C53.9787 16.0813 54.8036 15.5232 56.9631 15.4747V13.7035C52.5714 13.752 50.7516 15.0865 50.7516 18.2408C50.7516 21.2495 52.4015 22.5354 54.8764 22.5354C56.6477 22.5354 57.6182 21.7833 58.4432 20.934C58.7343 22.0744 59.6321 22.5354 60.8453 22.5354C61.7188 22.5354 62.5437 22.2928 63.0775 22.0016L62.8834 20.4245Z"
      fill="#FAFAFA"
    />
    <path
      d="M123.446 15.7932H130.215V14.5315C130.215 9.43613 128.25 7.64062 124.756 7.64062C121.141 7.64062 118.86 9.80009 118.86 15.0653C118.86 20.4033 121.019 22.5628 125.047 22.5628C127.207 22.5628 128.662 22.0047 130.07 20.8886L129.148 19.2144C128.032 19.918 127.11 20.3548 125.508 20.3548C123.324 20.3548 122.475 19.36 122.281 16.8851C122.233 16.5211 122.208 15.8417 122.208 15.1138C122.208 14.6528 122.208 14.2161 122.233 13.8764V13.8521C122.402 10.6251 123.155 9.58172 124.732 9.58172C126.576 9.58172 127.013 10.6978 127.013 13.8521H123.47V15.7932H123.446Z"
      fill="#FAFAFA"
    />
    <path d="M20.8341 24.043H0.792358V27.1245H20.8341V24.043Z" fill="#FAFAFA" />
    <path
      d="M0.792358 9.99219V22.5122L6.93106 18.2176V14.2869L0.792358 9.99219Z"
      fill="#FAFAFA"
    />
    <path
      d="M20.8097 13.3895V0.917969L14.6467 5.18837V9.04629L20.8097 13.3895Z"
      fill="#FAFAFA"
    />
    <path
      d="M20.8341 22.5369L20.8099 14.9181L0.792358 0.917969V8.46396L20.8341 22.5369Z"
      fill="#FAFAFA"
    />
  </svg>
)

const InternalLinkIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.25 3.75L15.75 8.25L14.685 9.315L12 6.6225L12 15L3 15L3 13.5L10.5 13.5L10.5 6.6225L7.815 9.315L6.75 8.25L11.25 3.75Z"
      fill="#E9DAAC"
    />
  </svg>
)
