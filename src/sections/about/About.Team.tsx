import React, { useState, useRef, createRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import usePortal from 'react-useportal'
import { useStaticQuery, graphql } from 'gatsby'
import SVG from 'react-inlinesvg'
import OutsideClickHandler from 'react-outside-click-handler'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import Media from '@components/Media/Media.Img'
import SocialLinksDynamic from '@components/SocialLinks/SocialLinks.Dynamic'

import mediaqueries from '@styles/media'
import { scrollable } from '@utils'
import { ExIcon, ChevronRightIcon } from '../../icons/ui/index'
import { IGraphqlSharpFluidImage, IStaticImage } from '../../types/index'

import AboutTeamModal from './About.Team.Modal'

interface Person {
  name: string
  role: string
  illustration: IGraphqlSharpFluidImage
  signature: IStaticImage
  about: string[]
  social: string[]
}

export const illustrationQuery = graphql`
  query GetIllustrations {
    brad: file(name: { regex: "/portrait-illustration-brad/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bradSig: file(name: { regex: "/brad-signature/" }) {
      publicURL
    }
    dan: file(name: { regex: "/portrait-illustration-dan/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    danSig: file(name: { regex: "/dan-signature/" }) {
      publicURL
    }
    dennis: file(name: { regex: "/portrait-illustration-dennis/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dennisSig: file(name: { regex: "/dennis-signature/" }) {
      publicURL
    }
    mack: file(name: { regex: "/portrait-illustration-mack/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mackSig: file(name: { regex: "/mack-signature/" }) {
      publicURL
    }
    thiago: file(name: { regex: "/portrait-illustration-thiago/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thiagoSig: file(name: { regex: "/thiago-signature/" }) {
      publicURL
    }
  }
`

function AboutTeam() {
  const illustrations = useStaticQuery(illustrationQuery)

  const people: Person[] = [
    {
      name: 'Thiago Costa',
      role: 'Brand and Design',
      illustration: illustrations.thiago,
      signature: illustrations.thiagoSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com',
        'https://dribbble.com',
        'https://github.com',
        'https://linkedin.com',
      ],
    },
    {
      name: 'Brad Tiller',
      role: 'Marketing and Growth',
      illustration: illustrations.brad,
      signature: illustrations.bradSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com',
        'https://dribbble.com',
        'https://github.com',
        'https://linkedin.com',
      ],
    },
    {
      name: 'Dennis Brotzky',
      role: 'Software Engineering',
      illustration: illustrations.dennis,
      signature: illustrations.dennisSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com',
        'https://dribbble.com',
        'https://github.com',
        'https://linkedin.com',
      ],
    },

    {
      name: 'Dan Le Van',
      role: 'Software Engineering',
      illustration: illustrations.dan,
      signature: illustrations.danSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com',
        'https://dribbble.com',
        'https://github.com',
        'https://linkedin.com',
      ],
    },
    {
      name: 'Mack Mansouri',
      role: 'Operations and Partnerships',
      illustration: illustrations.mack,
      signature: illustrations.mackSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com',
        'https://dribbble.com',
        'https://github.com',
        'https://linkedin.com',
      ],
    },
  ]

  const cardRefs = useRef([...Array(people.length)].map(() => createRef()))
  const [childRef, setChildRef] = useState()
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { Portal } = usePortal()

  const person = people[selectedPersonIndex]

  function handleRef(ref: any) {
    setChildRef(ref)
  }

  function handleSetSelectedPersonIndex(index: number) {
    if (cardRefs.current[index]) {
      setSelectedPersonIndex(index)

      const el: React.RefObject<any> = cardRefs.current[index]
      const box = el.current.getBoundingClientRect()

      if (childRef.current) {
        childRef.current.style.top = `${box.y}px`
        childRef.current.style.left = `${box.x}px`
      }
    }
  }

  function handleModalToggle(open: boolean, index?: number) {
    if (typeof index === 'number') {
      handleSetSelectedPersonIndex(index)
    }

    setIsOpen(open)

    if (open) {
      scrollable('disable')
    } else {
      document.body.style.pointerEvents = 'none'

      setTimeout(() => {
        document.body.style.pointerEvents = ''
        scrollable('enable')
      }, 460)
    }
  }

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleModalToggle(false)
      }
    }

    window.addEventListener('keydown', handleEscKeyPress)
    return () => window.removeEventListener('keydown', handleEscKeyPress)
  }, [])

  return (
    <>
      <AboutTeamContainer>
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
        <Sticky
          cover
          height="2200px"
          disableOnMobile
          render={({ progress: prog }: StickyState) => {
            const total = people.length

            const cardAnimation = {
              transform: `translate3d(-${prog * (total - 2) * 390}px, 0 , 0)`,
            }

            const scrollProgressAnimation = {
              transform: `translateX(${prog * 438}%)`,
            }

            return (
              <Section>
                <TeamCardsContainer style={cardAnimation}>
                  <Cards>
                    {people.map((person, index) => {
                      const cardIsOpen = isOpen && selectedPersonIndex === index

                      return (
                        <Card
                          key={person.name}
                          ref={cardRefs.current[index]}
                          onClick={() => handleModalToggle(true, index)}
                          isSelected={selectedPersonIndex === index}
                          isOpen={isOpen}
                        >
                          <IllustrationColored isOpen={cardIsOpen}>
                            <Media
                              src={person.illustration.childImageSharp.fluid}
                              loading="eager"
                            />
                          </IllustrationColored>
                          <Illustration isOpen={cardIsOpen}>
                            <Media
                              src={person.illustration.childImageSharp.fluid}
                              loading="eager"
                            />
                          </Illustration>
                          <div style={{ position: 'relative' }}>
                            <Name isOpen={cardIsOpen}>{person.name}</Name>
                            <Role isOpen={cardIsOpen}>{person.role}</Role>
                          </div>
                        </Card>
                      )
                    })}
                  </Cards>
                </TeamCardsContainer>
                <Progress>
                  <Value style={scrollProgressAnimation} />
                </Progress>
              </Section>
            )
          }}
        />

        <CompanyLogosRow />
      </AboutTeamContainer>

      {/* 
      
      The way the modal works for this is we have two parts.
      1. The Framer Motion animation that makes it look like the component is
          moving as a single piece
      2. The Modal content which is placed on top of the Framer Motion black modal
      
      */}
      <Portal>
        <AboutTeamModal isSelected={isOpen} handleRef={handleRef} />
        <AboutTeamModalContent
          isOpen={isOpen}
          people={people}
          person={person}
          handleOutsideClick={
            isOpen ? () => handleModalToggle(false) : () => {}
          }
          handleSetSelectedPersonIndex={handleSetSelectedPersonIndex}
        />
      </Portal>
    </>
  )
}

function AboutRow({
  children,
  header,
}: {
  children: React.ReactNode
  header: string
}) {
  return (
    <AboutRowSpacer data-scroll-fade={true}>
      <Section narrow>
        <AboutRowContainer>
          <AboutRowHeader>{header}</AboutRowHeader>
          <AboutRowContent>{children}</AboutRowContent>
        </AboutRowContainer>
      </Section>
    </AboutRowSpacer>
  )
}

function CompanyLogosRow() {
  return (
    <AboutRow header="History">
      <HistoryText>
        <Text>
          We founded Narative to have the freedom to both pursue our own
          ambitions and help businesses we believe in pursue theirs, applying
          everything we’ve learned working within and alongside companies like:
        </Text>
      </HistoryText>
      <CompanyLogos>
        <UbisoftLogo /> <HopperLogo /> <LightspeedLogo /> <YellowPagesLogo />{' '}
        <BreatherLogo /> <UnbounceLogo /> <RitualLogo />
      </CompanyLogos>
    </AboutRow>
  )
}

function AboutTeamModalContent({
  isOpen,
  people,
  person,
  handleOutsideClick,
  handleSetSelectedPersonIndex,
}: {
  isOpen: boolean
  people: Person[]
  person: Person
  handleOutsideClick: () => void
  handleSetSelectedPersonIndex: (index: number) => void
}) {
  const modalStyles = isOpen
    ? { opacity: 1, transition: `opacity 0s ease 0.4s` }
    : { opacity: 0, pointerEvents: 'none' }

  const activeIndex = people.findIndex(p => p.name === person.name)
  let nextIndex = activeIndex + 1

  if (activeIndex === people.length - 1) {
    nextIndex = 0
  }

  useEffect(() => {
    if (isOpen) {
      function handleKeyDown(event: KeyboardEvent) {
        switch (event.key) {
          case 'ArrowLeft':
            activeIndex === 0
              ? handleSetSelectedPersonIndex(people.length - 1)
              : handleSetSelectedPersonIndex(activeIndex - 1)
            break
          case 'ArrowRight':
            activeIndex === people.length - 1
              ? handleSetSelectedPersonIndex(0)
              : handleSetSelectedPersonIndex(activeIndex + 1)
            break
          default:
            return
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, activeIndex])

  return (
    <Modal style={modalStyles}>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <ModalContent>
          <CloseButton>
            <ExIcon fill="#fff" />
          </CloseButton>
          {isOpen && (
            <ModalGrid key={person.name}>
              <div>
                <ModalName>{person.name}</ModalName>
                <ModalRole>{person.role}</ModalRole>
                <div>
                  {person.about.map((text, index) => (
                    <ModalText index={index}>{text}</ModalText>
                  ))}
                </div>
                <SocialAnimator>
                  <SocialLinksDynamic links={person.social} />
                </SocialAnimator>
                <ModalSignature>
                  <SVG src={person.signature} />
                </ModalSignature>
              </div>
              <MediaAnimator>
                <Media src={person.illustration.childImageSharp.fluid} />
              </MediaAnimator>
            </ModalGrid>
          )}
          <ModalNext onClick={() => handleSetSelectedPersonIndex(nextIndex)}>
            <ChevronRightIcon />
          </ModalNext>
        </ModalContent>
      </OutsideClickHandler>
    </Modal>
  )
}

export default AboutTeam

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
  top: 30px;
  left: 30px;
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
`

const ModalGrid = styled.div`
  padding: 0 0 0 90px;
  display: grid;
  grid-template-columns: 480px 472px;
  grid-column-gap: 30px;
  align-items: center;
`

const ModalText = styled.p<{ index: number }>`
  color: #fff;
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 100 + 300}ms forwards;
`

const ModalName = styled(Heading.h2)`
  margin-bottom: 5px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 200ms
    forwards;
`

const ModalRole = styled.div`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms
    forwards;
`

const SocialAnimator = styled.div`
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 600ms
    forwards;
`

const ModalSignature = styled.div`
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 700ms
    forwards;
`

const MediaAnimator = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;
`

const ModalNext = styled.button`
  position: absolute;
  right: -20px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: #fff;
  border-radius: 50%;
  transform: translateY(-50%);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`

const AboutTeamContainer = styled.div`
  padding: 0 0 240px;
`

const AboutRowSpacer = styled.div`
  overflow: hidden;
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
`

const HistoryText = styled.div`
  max-width: 681px;
`

const Text = styled.p`
  font-size: 22px;
  line-height: 28px;
  color: #fafafa;
`

const TeamCardsContainer = styled.div`
  display: flex;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  padding-bottom: 1rem;
  width: 100%;
  padding: 16vh 0 0 263px;
  align-items: center;
  will-change: transform;
  transform-style: preserve-3d;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 390px);
  grid-column-gap: 20px;
`

const Illustration = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: opacity 0.4s 0.3s;
  filter: grayscale(1);
`

const IllustrationColored = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: ${p => (p.isOpen ? 'opacity 0.4s 0.3s' : 'opacity 0.3s;')};
`

const Name = styled(Heading.h3)<{ isOpen: boolean }>`
  margin-bottom: 0;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.4s 0.5s, opacity 0.4s 0.5s;
`

const Role = styled.div<{ isOpen: boolean }>`
  color: ${p => p.theme.colors.grey};
  font-size: 22px;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.5s 0.475s, opacity 0.4s 0.475s, color 0.4s;
`

const Card = styled.div<{ isSelected: boolean; isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 470px;
  background: #000;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  text-align: center;
  padding: 0 0 44px;
  cursor: pointer;
  will-change: filter;
  transition: filter 0.2s, opacity 0s;
  overflow: hidden;
  opacity: ${p => (p.isSelected && p.isOpen ? 0 : 1)};

  ${p => !p.isOpen && `transition-delay: 0.4s;`}

  &:hover ${Role} {
    color: ${p => p.theme.colors.gold};
  }

  &:hover ${Illustration} {
    opacity: 0;
  }
`

const Progress = styled.div`
  margin: 40px 15px 180px 263px;
  position: relative;
  height: 1px;
  background: rgba(250, 250, 250, 0.15);
  overflow: hidden;
`

const Value = styled.div`
  position: absolute;
  left: 0;
  width: 18.6%;
  height: 1px;
  background: ${p => p.theme.colors.sirius};
`

const CompanyLogos = styled.div`
  margin-top: 80px;
  height: 30px;
  display: flex;

  svg {
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
`

const UbisoftLogo = () => (
  <svg
    width="96"
    height="31"
    viewBox="0 0 96 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.2512 25.2525C24.9196 26.917 23.3027 28.201 21.4004 29.1522C19.9738 29.8655 18.4519 30.3411 16.835 30.5313C16.1217 30.6264 15.4083 30.674 14.7425 30.674C12.6025 30.674 10.51 30.246 8.51262 29.2948C6.99081 28.5815 5.65923 27.6779 4.47032 26.489C2.33027 24.3965 0.951131 21.9236 0.285339 19.0226C0.14267 18.3093 0.0475565 17.5484 0 16.7875V16.6923V15.1705V15.0754C0.0475565 14.7425 0.0475565 14.4572 0.0475565 14.1719C0.237783 12.6976 0.618235 11.3185 1.18891 9.93932L1.47425 9.36864C1.28403 9.22597 1.08191 9.0833 0.879796 8.94063C0.677681 8.79796 0.475565 8.65529 0.285339 8.51262V8.46507C1.14136 6.84814 2.1876 5.42145 3.51918 4.18498C6.13479 1.71204 9.17841 0.332896 12.7452 0.0475565L13.1732 0H14.7425L15.1705 0.0475565C18.5946 0.332896 21.6382 1.56937 24.2538 3.80452C26.7268 5.94457 28.3437 8.56018 29.1046 11.7465C29.3899 12.8878 29.5326 14.1243 29.5802 15.3132C29.6277 16.5972 29.5326 17.8337 29.2473 19.0702C28.7242 21.3529 27.7255 23.4454 26.2512 25.2525ZM3.6143 20.1164C3.51918 19.4506 3.56674 18.7373 3.66185 18.0239C3.80452 16.7875 4.23253 15.5985 4.85077 14.5047C6.42013 11.7465 9.22597 10.2247 12.1745 10.2247C12.7927 10.2247 13.3634 10.2722 13.9816 10.4149C15.8839 10.7953 17.4533 11.7465 18.8324 13.0781L19.8311 14.2194L19.9738 14.267L20.2591 14.1243V14.0767C20.0213 13.2207 19.6409 12.4123 19.1177 11.6989C17.4533 9.32108 14.5999 7.94194 11.7465 7.94194C11.366 7.94194 10.938 7.9895 10.5576 8.03706C8.41751 8.36995 6.61036 9.27353 5.08855 10.8429C2.94851 13.0305 1.99738 16.5021 2.94851 19.5933C3.04362 19.8786 3.13873 20.1164 3.23385 20.3542L3.51918 20.2591L3.6143 20.1164ZM17.263 21.1627C17.4533 21.02 17.5959 20.8298 17.7386 20.6395C17.5117 20.4694 17.2848 20.3161 17.068 20.1697L17.0677 20.1695L17.0677 20.1695L17.0676 20.1694L17.0675 20.1694L17.0675 20.1693C16.9209 20.0704 16.779 19.9745 16.6448 19.8786L16.6923 19.7835C17.3106 19.0226 17.5959 18.1666 17.5008 17.1679C17.3106 15.5034 15.8839 14.3145 14.267 14.3145C14.0767 14.3145 13.8865 14.3145 13.6963 14.3621C11.4611 14.7901 9.98688 16.9301 10.4624 19.1653C10.8429 20.9724 12.5074 22.3516 14.3621 22.3516C15.5034 22.3516 16.4546 21.9711 17.263 21.1627ZM11.4136 27.345C12.65 27.8681 13.9341 28.1059 15.2181 28.1059C15.6461 28.1059 16.0266 28.0584 16.3595 28.0108C17.7386 27.8681 19.0702 27.4877 20.3066 26.8694C22.9223 25.5854 24.777 23.588 25.9659 20.9724C27.0597 18.4995 27.345 15.9314 26.8694 13.2683C26.3463 10.5576 25.1099 8.17973 23.0649 6.27746C20.592 3.89964 17.5484 2.71072 14.1243 2.61561H13.7914C12.7927 2.61561 11.8416 2.75828 10.8904 2.99606C8.22728 3.66185 6.03968 5.04099 4.3752 7.18104C4.28009 7.32371 4.18498 7.45449 4.08987 7.58527L4.08986 7.58527C3.99475 7.71605 3.89964 7.84683 3.80452 7.9895L4.04231 8.22728C4.85077 7.6566 5.65923 7.18104 6.51525 6.75303C8.22728 5.94457 9.98687 5.51656 11.794 5.51656C12.4123 5.51656 13.0781 5.56412 13.6963 5.65923C16.0741 6.03968 18.1666 7.08593 19.8311 8.79796C22.1614 11.2233 23.2552 14.1243 22.7796 17.5008C22.6369 18.8324 22.2089 20.0213 21.5431 21.1627C20.0213 23.6832 17.4533 25.1099 14.695 25.1099C14.2194 25.1099 13.6963 25.0623 13.1732 24.9672C11.8416 24.6818 10.6051 24.1112 9.65398 23.1125C8.27484 21.6382 7.6566 19.8786 7.84683 17.8813C7.9895 16.407 8.56018 15.0279 9.55887 13.8865V13.839L9.32108 13.5536C8.3224 14.1243 7.32371 15.2181 6.80059 16.3119C5.99213 17.9764 5.84946 19.736 6.32502 21.5431C7.08593 24.3014 8.79796 26.2037 11.4136 27.345ZM89.4459 21.0312H91.9308V12.0119H95.106V9.66505H94.968H86.3628H86.2247V12.0119H89.4459V21.0312ZM70.5963 21.2305C69.5379 21.2305 68.4795 20.9544 67.5132 20.3561C65.9026 19.3898 65.0743 17.9172 64.9362 16.0766C64.8442 14.8801 65.0743 13.7297 65.7185 12.6713C65.9946 12.2111 66.3627 11.797 66.7769 11.4288L66.3627 11.0607C66.5468 10.9227 66.6849 10.7846 66.8229 10.6466C67.5592 10.0943 68.4335 9.72621 69.3538 9.58816C69.768 9.49612 70.2282 9.45011 70.6423 9.45011C71.2866 9.45011 71.9308 9.54214 72.529 9.77223C74.5078 10.4625 75.7042 11.843 76.2104 13.8217C76.5785 15.2483 76.4405 16.6748 75.7962 18.0553C75.06 19.6199 73.8175 20.6322 72.1149 21.0464C71.6547 21.1845 71.1485 21.2305 70.5963 21.2305ZM70.6883 11.797C70.1822 11.797 69.676 11.889 69.1698 12.1191C68.8016 12.2571 68.4795 12.4872 68.2034 12.8094L68.5716 13.1315C68.4741 13.2678 68.3685 13.3877 68.2651 13.5051L68.265 13.5051C68.1242 13.6649 67.9874 13.8201 67.8813 14.0058C67.4671 14.65 67.3751 15.3403 67.4671 16.0766C67.5592 16.8589 67.8813 17.5491 68.4795 18.1013C69.1238 18.6535 69.86 18.8836 70.6883 18.8836H70.8724C72.2069 18.8376 73.3113 18.0553 73.7255 16.7668C74.0476 15.8465 74.0476 14.8801 73.7715 13.9598C73.4494 12.9474 72.7591 12.2571 71.7007 11.935C71.3786 11.843 71.0105 11.797 70.6883 11.797ZM44.0762 21.0352H46.1929H47.7575C48.1717 21.0352 48.5858 20.9891 49 20.8971C49.7363 20.7591 50.3805 20.4369 50.9327 19.8847C51.5769 19.2405 51.807 18.4582 51.807 17.5839C51.807 16.5255 51.3929 15.7432 50.4725 15.191C50.3575 15.145 50.2539 15.0875 50.1504 15.0299C50.0469 14.9724 49.9433 14.9149 49.8283 14.8689L49.9663 14.7768C50.4725 14.5468 50.8867 14.1326 51.0707 13.5804C51.1515 13.3383 51.1968 13.0608 51.2377 12.81L51.2548 12.7061C51.3468 11.6477 50.9787 10.8194 50.0584 10.2672C49.3681 9.807 48.5398 9.66895 47.7115 9.66895H46.239H44.0301H43.8921V21.0352H44.0762ZM46.377 18.8263C46.377 17.906 46.377 16.9857 46.423 16.0193C46.5611 16.0193 46.6531 16.0193 46.7912 15.9733H46.9292H47.1133C47.4814 15.9733 47.8035 15.9733 48.1717 16.0193C48.7239 16.0653 49.138 16.3414 49.3221 16.8936C49.4602 17.4458 49.4602 17.998 49 18.4582C48.7699 18.6883 48.4018 18.8263 48.0796 18.8263H47.3894H46.377ZM46.423 14.2246V11.8318H46.5611H46.9292H47.2513C47.4814 11.8318 47.7575 11.8318 47.9876 11.8778C48.6318 11.9698 49 12.43 49 13.1202C49 13.7185 48.5858 14.1786 47.9416 14.2246H47.3434H46.423ZM37.9934 21.1523C37.4412 21.1523 36.889 21.0603 36.3368 20.8762C34.7722 20.4161 33.8519 19.3117 33.4377 17.7471C33.3457 17.2869 33.2997 16.8267 33.2997 16.3666V9.74012V9.55605H35.7846V9.74012V16.2285C35.7846 16.5967 35.8306 16.9648 35.9227 17.2869C36.1988 18.2073 36.843 18.7134 37.8094 18.7595H37.9934C38.5456 18.7595 39.0518 18.6214 39.466 18.2533C39.8341 17.9312 40.0182 17.471 40.1102 16.9648C40.1562 16.6887 40.2022 16.3666 40.2022 16.0905V9.74012V9.55605H42.6872V9.6941V16.4126C42.6872 17.2409 42.5491 18.0232 42.181 18.7595C41.6748 19.7718 40.8925 20.4621 39.7881 20.8302C39.1899 21.0603 38.5916 21.1523 37.9934 21.1523ZM57.7632 20.5784C58.5455 21.0386 59.3738 21.2227 60.2021 21.2227C60.488 21.2227 60.8101 21.1864 61.1685 21.1461L61.3065 21.1306C62.1348 20.9926 62.8711 20.5784 63.4233 19.9342C64.0675 19.1979 64.2976 18.2776 64.2516 17.3112C64.2056 16.3909 63.8374 15.7006 63.1012 15.1484C62.733 14.8723 62.3189 14.6882 61.9047 14.5042C61.6286 14.3891 61.341 14.2741 61.0534 14.159C60.7658 14.044 60.4782 13.929 60.2021 13.8139C59.834 13.6759 59.5118 13.4918 59.2357 13.2157C59.0056 12.9856 58.9136 12.7555 58.9596 12.4334C59.0517 12.0193 59.3278 11.7431 59.6959 11.6511C59.88 11.6051 60.064 11.5591 60.2941 11.5591C60.8923 11.5591 61.5366 11.8352 61.9507 12.5715L62.1348 12.8936C62.8247 12.4337 63.4685 11.9738 64.1124 11.5139L64.113 11.5135L64.1135 11.5131L64.1135 11.5131C63.8374 10.8688 63.3773 10.4087 62.8251 10.0405C62.1808 9.62636 61.4446 9.48831 60.6623 9.4423H60.3862C59.6499 9.4423 58.9136 9.58035 58.2694 9.94848C56.5667 10.9609 56.3827 12.8476 57.0269 14.09C57.349 14.6882 57.8552 15.1024 58.4074 15.4245C58.8568 15.7241 59.3367 15.9018 59.8222 16.0816C59.9333 16.1227 60.0447 16.164 60.1561 16.2068C60.5702 16.3449 60.9844 16.5289 61.3525 16.805C61.9047 17.2652 61.9507 18.0935 61.4446 18.5537C61.2145 18.7838 60.8923 18.8758 60.5242 18.8758H60.4782C59.5579 18.8758 58.8676 18.4616 58.4074 17.6793L58.1773 17.2652H58.1313C57.5331 17.7254 56.9349 18.1855 56.2906 18.6457L56.2446 18.8298C56.5667 19.566 57.0729 20.1643 57.7632 20.5784ZM79.9832 21.0312H77.4983V9.66505H85.2752V12.0119H79.9832V14.6349H84.815V16.5216H79.9832V21.0312ZM52.8347 21.0312H55.2736V9.66505H52.8347V21.0312Z"
      fill="#FAFAFA"
    />
  </svg>
)

const HopperLogo = () => (
  <svg
    width="99"
    height="27"
    viewBox="0 0 99 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.7435 11.2455C29.2214 10.7981 29.1468 10.7235 29.1468 10.5743C29.1468 10.4998 29.3706 8.33726 29.2214 6.32388C28.8485 1.626 26.6857 0.582031 25.9399 0.582031C25.8653 0.582031 25.8653 0.582031 25.7907 0.656601C25.567 0.954879 25.567 1.84971 25.8653 3.49024C26.0145 4.16137 26.3874 5.35448 26.7603 6.62216C27.2078 8.03898 27.6552 9.4558 27.8044 10.2761L27.879 10.4252L26.7603 10.7981L26.6857 10.6489C26.462 10.0524 26.0891 9.15752 25.7907 8.03898C25.1941 6.24931 24.4483 4.01223 23.8517 3.11739C23.4042 2.3717 22.4346 1.4023 21.9872 1.4023H21.9126C21.6888 1.47687 21.4651 1.70057 21.3905 2.14799C21.0922 3.3411 21.4651 5.57819 23.0313 7.81527C24.5975 9.90322 25.3433 11.0963 25.4178 11.4692L25.4924 11.6183L25.4178 11.6929C25.4178 11.6929 25.1195 12.0657 24.672 12.0657C24.4483 12.0657 24.2246 11.9912 24.0754 11.7675C20.5701 8.33726 16.9903 6.62216 13.5596 6.62216C11.4714 6.62216 9.90518 7.21872 9.15938 7.59156C8.86106 7.7407 8.63732 7.81527 8.48816 7.81527C8.339 7.81527 8.339 7.7407 8.26442 7.7407C8.18984 7.66613 8.18984 7.66613 8.18984 7.51699C8.18984 6.54759 8.11526 5.42905 7.89152 5.13077C7.81694 5.0562 7.74236 5.0562 7.66778 5.0562C6.32534 4.98163 4.38625 5.95103 3.71503 7.36786C3.26755 8.18812 3.41671 9.00838 3.93877 9.82865C4.46083 10.5743 5.28122 10.5743 5.80328 10.6489C6.1016 10.6489 6.32534 10.7235 6.39992 10.8726C6.4745 11.0963 6.25076 11.1709 6.1016 11.3946C0.955572 15.4214 -0.31229 18.8516 0.0606107 20.0447C0.135191 20.1938 0.209771 20.3429 0.358931 20.3429C0.508091 20.3429 0.582671 20.2684 0.731831 20.1938C4.75916 16.7636 8.86106 14.9739 13.0375 14.9739C20.6447 14.9739 26.0145 20.6412 27.5061 22.4309C27.8044 22.8037 28.1773 23.2512 28.4756 23.6986C29.296 24.7425 30.1164 25.7865 30.8622 26.3085C31.4588 26.6814 32.13 26.7559 32.4284 26.3831C32.6521 26.1594 32.7267 25.6374 32.5775 24.9663C32.2792 23.4003 30.8622 21.6852 29.8926 20.7158C29.0723 19.821 28.7739 19.4481 28.8485 19.1498C28.9231 19.0753 28.9231 18.9261 29.1468 18.9261C31.5334 18.4041 32.9504 17.5839 33.1742 16.3908C33.5471 14.452 30.8622 12.2149 29.7435 11.2455ZM53.6091 9.4558C51.0734 9.4558 48.9851 11.3946 48.9851 13.7063C48.9851 14.2282 49.1343 14.7502 49.2835 15.2722L49.358 15.3468L49.2835 15.4214C48.7614 16.0179 48.3139 16.3908 47.8664 16.3908C46.9715 16.3908 46.9715 15.1231 46.9715 13.5571C46.8969 11.6183 46.8969 9.4558 45.1816 9.4558C43.1679 9.4558 41.6017 12.0657 40.6322 14.3028L40.2593 15.0485L40.4084 12.5131C40.5576 9.90322 40.6322 7.44242 40.6322 4.98163C40.6322 2.74455 40.5576 1.47687 40.483 1.17859C40.4084 1.02945 39.961 0.73117 39.5881 0.73117C39.3643 0.73117 38.5439 1.10402 38.3948 1.25316C38.2456 1.55143 38.0964 4.60878 38.0964 7.51699C38.0964 14.3774 38.5439 17.2856 38.6185 17.6584V17.733C38.6931 17.8822 39.066 17.9567 39.3643 17.9567C39.6626 17.9567 40.1101 17.8822 40.1847 17.733L40.2593 17.5839C41.0797 15.4214 42.6458 11.7675 43.9883 11.7675C44.7341 11.7675 44.7341 12.7369 44.8087 13.8554C44.8832 15.6451 44.9578 17.8822 47.419 17.8822C48.3139 17.8822 49.2089 17.3602 50.0293 16.3908L50.1784 16.2416L50.3276 16.3908C51.2225 17.2856 52.4904 17.8822 53.8328 17.8822C56.4431 17.8822 58.5314 15.9433 58.5314 13.6317C58.2331 11.3946 56.1448 9.4558 53.6091 9.4558ZM53.6091 16.3162C52.4158 16.3162 51.5209 15.1231 51.5209 13.7063C51.5209 12.2894 52.4904 11.0963 53.6091 11.0963C54.8024 11.0963 55.7719 12.2894 55.7719 13.7063C55.7719 15.1231 54.8024 16.3162 53.6091 16.3162ZM63.8266 9.4558C62.9316 9.4558 61.9621 9.75408 61.2163 10.2761L60.9925 10.4252L60.9179 10.2015C60.8434 9.90322 60.8434 9.67951 60.8434 9.67951C60.7688 9.53037 60.3213 9.4558 60.023 9.4558C59.7993 9.4558 59.3518 9.53037 59.2772 9.67951C59.2026 9.97779 58.8297 13.3334 58.8297 19.3735V19.4481C58.9043 19.5227 58.9043 19.5972 58.9043 19.8955C58.9789 22.8783 59.2026 25.7865 59.3518 26.1594C59.5009 26.3085 60.3213 26.6814 60.5451 26.6814H60.6196C61.0671 26.6814 61.44 26.3831 61.44 26.2339C61.44 26.1594 61.5146 25.8611 61.5146 23.9223V22.4309C61.5146 21.3869 61.44 20.7158 61.44 19.821C61.3654 19.2244 61.3654 18.5533 61.2908 17.5093V17.2856L61.5146 17.4347C62.2604 17.8076 63.0062 18.0313 63.752 18.0313C66.3623 18.0313 68.4505 16.0925 68.4505 13.7808C68.5251 11.3946 66.4369 9.4558 63.8266 9.4558ZM63.8266 16.3162C61.8875 16.3162 61.2163 14.9739 61.2163 13.7063C61.2163 12.1403 62.1858 11.0963 63.8266 11.0963C65.0199 11.0963 65.9894 12.2894 65.9894 13.7063C65.9894 15.1231 65.0199 16.3162 63.8266 16.3162ZM74.1186 9.4558C73.2237 9.4558 72.2541 9.75408 71.5083 10.2761L71.2846 10.4252L71.21 10.2015C71.1354 9.90322 71.1354 9.67951 71.1354 9.67951C71.0608 9.53037 70.6134 9.4558 70.315 9.4558C70.0913 9.4558 69.6438 9.53037 69.5692 9.67951C69.4947 9.97779 69.1218 13.3334 69.1218 19.3735V19.4481C69.1963 19.5227 69.1963 19.5972 69.1963 19.8955C69.2709 22.8783 69.4947 25.7865 69.6438 26.1594C69.793 26.3085 70.6134 26.6814 70.8371 26.6814H70.9117C71.3592 26.6814 71.7321 26.3831 71.7321 26.2339C71.7321 26.1594 71.8066 25.8611 71.8066 23.9223V22.4309C71.8066 21.3869 71.7321 20.7158 71.7321 19.821C71.6575 19.2244 71.6575 18.5533 71.5829 17.5839V17.3602L71.8066 17.5093C72.5524 17.8822 73.2982 18.1059 74.0441 18.1059C76.6544 18.1059 78.7426 16.1671 78.7426 13.8554C78.8172 11.3946 76.7289 9.4558 74.1186 9.4558ZM74.1186 16.3162C72.1795 16.3162 71.5083 14.9739 71.5083 13.7063C71.5083 12.1403 72.4779 11.0963 74.1186 11.0963C75.3119 11.0963 76.2814 12.2894 76.2814 13.7063C76.2814 15.1231 75.3119 16.3162 74.1186 16.3162ZM98.208 12.6623C98.208 12.6623 98.1334 12.7369 98.1334 12.8114C97.4622 14.1537 96.0452 16.3908 95.001 16.3908C94.7027 16.3908 94.5536 16.1671 94.5536 15.8688C94.5536 15.4959 94.8519 14.7502 95.2248 13.93C95.5231 13.1097 95.9706 12.2149 95.9706 11.6929C95.9706 10.7981 95.3739 10.3506 94.3298 10.3506C94.2552 10.3506 92.0178 10.3506 91.3466 9.90322L91.272 9.82865V9.75408C91.272 9.23209 91.1229 7.88984 90.0042 7.88984C89.4075 7.88984 89.0346 8.78468 89.0346 9.23209C89.0346 10.4252 89.6313 10.9472 89.9296 11.0963C90.0042 11.1709 90.0042 11.1709 90.0042 11.1709L90.0788 11.2455L90.0042 11.32C89.7059 12.4386 89.0346 13.408 88.7363 14.0045C87.6922 15.4959 86.4243 16.1671 84.709 16.1671C83.4411 16.1671 82.4716 15.4959 82.1733 14.3774L82.0987 14.0791L82.3224 14.1537C82.9937 14.3774 83.5903 14.452 84.1869 14.452C85.8277 14.452 87.543 13.6317 87.543 11.842C87.543 10.3506 86.126 9.23209 84.1869 9.23209C81.6512 9.23209 79.563 11.1709 79.563 13.4826C79.563 15.1976 80.9054 17.733 84.6344 17.733C87.6176 17.733 89.1092 15.0485 89.5567 14.2282L89.6313 14.1537C90.1533 13.2588 90.6008 12.1403 90.75 11.6929L90.8246 11.5437L90.9737 11.6183C91.1975 11.6929 92.2416 11.9166 92.9128 11.9166C93.2111 11.9166 93.4349 12.0657 93.4349 12.364C93.4349 12.4386 93.3603 12.5131 93.3603 12.5877L93.2857 12.6623L93.1365 12.886C92.7636 13.7063 92.2416 14.8994 92.2416 15.7196C92.2416 16.7636 92.9128 17.8076 94.4044 17.8076C96.4926 17.8076 97.7605 15.1977 98.208 14.3774L98.2826 14.3028C98.3571 14.0791 98.4317 13.7808 98.4317 13.408C98.3571 13.1097 98.2826 12.6623 98.208 12.6623ZM82.0987 13.408C82.2479 12.1403 83.2174 11.0963 84.1869 11.0963C85.0819 11.0963 85.6785 11.5437 85.6785 12.364C85.6785 13.3334 84.3361 13.7063 83.2174 13.7063C82.7699 13.7063 82.397 13.6317 82.1733 13.5571L82.0241 13.4826L82.0987 13.408Z"
      fill="#FAFAFA"
    />
  </svg>
)

const LightspeedLogo = () => (
  <svg
    width="121"
    height="28"
    viewBox="0 0 121 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5172 2.21148L9.24626 0L0.400353 15.3278C-0.133451 16.2683 -0.133451 17.4122 0.400353 18.3527L3.95905 24.5296C4.51827 25.4701 6.19595 27.5799 9.24626 27.5799C12.2966 27.5799 13.9997 25.4701 14.5335 24.5296L18.0922 18.3527C18.626 17.4122 18.626 16.2683 18.0922 15.3278L14.5843 9.25261L9.24626 18.5052L8.28032 16.8276L13.1862 8.3121C13.4404 7.85455 13.4404 7.29533 13.1862 6.83778L11.9153 4.62631L4.87414 16.8276L8.00071 22.191C8.25491 22.6486 8.73787 22.9282 9.27168 22.9282C9.78006 22.9282 10.2884 22.6486 10.5426 22.191L14.6097 15.1499L15.5502 16.8276L11.9661 23.0299C11.4069 23.9958 10.3647 24.6058 9.24626 24.6058C8.12781 24.6058 7.08562 23.9958 6.5264 23.0299L2.94228 16.8276L10.5172 3.68579C10.7714 3.22825 10.7714 2.66902 10.5172 2.21148ZM28.2591 6.58254H25.7934V21.1478H28.2591V6.58254ZM31.5639 9.25327C32.3641 9.25327 33.0128 8.60457 33.0128 7.80437C33.0128 7.00416 32.3641 6.35547 31.5639 6.35547C30.7637 6.35547 30.115 7.00416 30.115 7.80437C30.115 8.60457 30.7637 9.25327 31.5639 9.25327ZM32.8099 11.0352H30.3188V21.152H32.8099V11.0352ZM39.3422 10.7779C36.5206 10.7779 34.2329 12.7606 34.2329 15.9126C34.2329 19.0646 36.2156 20.9965 39.3676 20.9965C40.6131 20.9965 41.9349 21.632 41.9349 23.03C41.9349 24.4281 40.8165 25.2161 39.3676 25.2161C37.9187 25.2161 36.724 24.3518 36.724 23.03H34.2329C34.2329 25.7499 36.419 27.5546 39.3676 27.5546C42.2908 27.5546 44.426 25.8261 44.426 23.03C44.426 21.7336 44.0193 20.5135 42.3417 19.6747C43.9939 18.9121 44.4769 17.1582 44.4769 15.8872C44.4769 12.7606 42.1637 10.7779 39.3422 10.7779ZM39.3676 18.9375C37.9187 18.9375 36.724 17.692 36.724 15.9126C36.724 14.1587 37.9187 12.8623 39.3676 12.8623C40.8165 12.8623 41.9858 14.1841 41.9858 15.9126C41.9858 17.6665 40.7911 18.9375 39.3676 18.9375ZM48.5459 12.278C49.461 11.1342 50.554 10.7783 51.6979 10.7783C54.5702 10.7783 55.8412 12.7102 55.8158 15.6842V21.1239H53.3247V15.8622C53.3247 14.032 52.3588 13.244 51.037 13.244C49.5626 13.244 48.5459 14.4895 48.5459 15.9892V21.1239H46.0548V6.5587H48.5459V12.278ZM61.8885 19.422C61.5835 19.422 61.3293 19.3203 61.1768 19.117C61.0243 18.9136 60.948 18.6086 60.948 18.1511V13.1689H62.9562L63.1849 11.0082H60.9734V8.23754L58.4569 8.51715V11.0337H56.5505V13.1943H58.4569V18.2273C58.4569 19.2695 58.7111 20.0575 59.1941 20.5913C59.6771 21.1251 60.4142 21.4047 61.3547 21.4047C61.7869 21.4047 62.1936 21.3539 62.6257 21.2268C63.0578 21.0997 63.4391 20.9218 63.7696 20.693L62.9053 19.0916C62.5749 19.3203 62.219 19.422 61.8885 19.422ZM68.7638 14.9219C69.9299 14.998 71.1206 15.0756 72.1344 15.7093C72.9733 16.2177 73.2783 17.1582 73.2275 18.0987C73.2275 19.7763 71.9057 20.8948 70.3551 21.2507C68.2961 21.7082 66.0338 21.2761 64.407 19.9289C64.407 19.9289 64.3307 19.8526 64.2545 19.8018L65.5254 18.2004C66.1101 18.5816 66.6439 18.8867 67.3048 19.0646C67.9403 19.2171 68.5757 19.268 69.2112 19.2425C69.7959 19.2171 70.6347 19.0138 70.7618 18.3274C70.9651 17.3361 69.7959 17.1582 69.0841 17.0819C68.9629 17.0671 68.8392 17.053 68.7139 17.0387C67.7618 16.9302 66.7124 16.8105 65.8813 16.2939C65.0425 15.7855 64.5341 14.8958 64.5341 13.9299C64.5341 11.5913 66.9743 10.7779 68.8299 10.7779C70.4313 10.7779 71.626 11.083 72.7953 12.0997L71.3973 13.7266C70.6855 13.0657 69.8467 12.8369 68.8808 12.8369C67.6861 12.8369 67.0252 13.1928 67.0252 13.8282C67.0252 14.7179 68.0674 14.8704 68.7537 14.9213L68.7638 14.9219ZM80.3431 10.7779C79.1992 10.7779 77.852 11.2609 77.064 12.3793L76.9877 11.0067H74.5729V25.5719L77.064 25.2923V19.9543C77.7757 21.0473 79.3263 21.4032 80.3939 21.4032C83.6221 21.4032 85.5032 18.9883 85.5032 16.0651C85.5032 13.0911 83.4442 10.7779 80.3431 10.7779ZM80.1397 19.2425C78.4366 19.2425 77.2927 17.692 77.2927 16.116C77.2927 14.54 78.3604 12.8623 80.1397 12.8623C81.9445 12.8623 82.9867 14.5654 82.9867 16.116C83.0121 17.692 81.8428 19.2425 80.1397 19.2425ZM91.9091 19.2171C90.1297 19.2171 89.0367 18.1749 88.7571 16.9802H97.0438C97.298 12.8623 94.756 10.7779 91.7057 10.7779C88.8079 10.7779 86.4439 13.0148 86.4439 16.0651C86.4439 19.2934 88.7317 21.3778 91.8837 21.3778C93.4088 21.3778 95.1627 20.844 96.2303 19.7509L94.6289 18.1749C94.0443 18.7596 92.8242 19.2171 91.9091 19.2171ZM91.7057 12.8369C93.1546 12.8369 94.3493 13.8791 94.6289 15.0738H88.7571C89.113 13.752 90.3585 12.8369 91.7057 12.8369ZM100.298 16.9802C100.577 18.1749 101.67 19.2171 103.45 19.2171C104.365 19.2171 105.585 18.7596 106.17 18.1749L107.771 19.7509C106.703 20.844 104.95 21.3778 103.424 21.3778C100.272 21.3778 97.9847 19.2934 97.9847 16.0651C97.9847 13.0148 100.349 10.7779 103.246 10.7779C106.297 10.7779 108.839 12.8623 108.584 16.9802H100.298ZM106.195 15.0738C105.915 13.8791 104.721 12.8369 103.272 12.8369C101.925 12.8369 100.679 13.752 100.323 15.0738H106.195ZM117.887 19.8006C117.099 20.919 115.752 21.402 114.608 21.402C111.507 21.402 109.448 19.0888 109.448 16.1402C109.448 13.1915 111.304 10.8021 114.532 10.8021C115.599 10.8021 117.175 11.1326 117.887 12.2256V6.58254H120.378V21.1478H117.963L117.887 19.8006ZM117.633 16.0639C117.633 14.4879 116.489 12.9374 114.786 12.9374C113.083 12.9374 111.939 14.4879 111.939 16.0639C111.939 17.6145 112.981 19.3176 114.786 19.3176C116.565 19.3176 117.633 17.6399 117.633 16.0639Z"
      fill="#FAFAFA"
    />
  </svg>
)

const YellowPagesLogo = () => (
  <svg
    width="82"
    height="26"
    viewBox="0 0 82 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3808 24.7354C13.0354 27.2025 3.47529 20.3151 0.905367 14.9697C-1.66456 9.62425 1.52215 4.38161 6.86759 1.81169C8.61514 0.989313 10.4655 0.578125 12.3158 0.578125C15.8109 0.578125 19.1004 2.22288 20.7452 5.82077C23.3151 11.0634 23.7263 22.1655 18.3808 24.7354ZM9.74635 6.12903H6.35406L7.69042 8.18497C8.40999 9.31573 8.3072 10.7549 7.58762 11.8857L6.45685 13.4276L6.55965 13.5304C7.07363 14.0444 7.89601 14.0444 8.41 13.5304L9.64356 12.3996C9.68282 12.3604 9.70709 12.3211 9.72782 12.2876C9.76135 12.2333 9.78562 12.194 9.84915 12.194C10.7743 11.5773 12.0079 11.7829 12.6247 12.708L16.9421 18.8758C16.9421 18.9786 17.0449 19.0814 17.0449 19.0814C17.5589 19.5954 18.3813 19.5954 18.8953 19.0814L13.8582 8.39056C12.8303 6.33462 10.8771 6.12903 9.74635 6.12903ZM8.1016 18.3619C8.1016 17.9507 8.1016 17.6423 8.3072 17.3339L10.5687 12.708C10.5687 12.708 11.4939 12.3996 12.2135 13.4276C12.3163 13.6332 12.3163 13.9416 12.2135 14.25L9.02678 19.6982C9.02678 19.6982 8.1016 19.0814 8.1016 18.3619ZM69.6775 12.6066C69.1636 14.9709 67.2104 16.924 64.1265 16.924C60.6314 16.924 58.2671 14.3541 58.2671 10.6534C58.2671 7.05553 60.7342 4.38281 64.2293 4.38281C67.1076 4.38281 69.0608 5.92477 69.7803 8.49469L67.2104 9.00867C66.6964 7.46672 65.6685 6.74714 64.3321 6.74714C62.6874 6.74714 61.1454 7.98071 61.1454 10.6534C61.1454 13.3261 62.6874 14.5597 64.3321 14.5597C65.7713 14.5597 66.902 13.5317 67.3132 12.0926L69.6775 12.6066ZM57.7525 15.6867C57.7525 16.4063 57.2385 16.9203 56.519 16.9203C55.7994 16.9203 55.2854 16.4063 55.2854 15.6867C55.2854 14.9671 55.7994 14.4531 56.519 14.4531C57.2385 14.4531 57.7525 15.0699 57.7525 15.6867ZM74.3035 17.0238C75.9482 17.0238 77.4902 16.3042 78.4154 14.9679V16.8182H81.2937C81.1909 16.407 81.1909 15.5846 81.1909 15.1735V9.00564C81.1909 6.33292 79.4433 4.58538 76.1538 4.58538C73.5839 4.58538 71.528 5.81894 70.7056 7.97767L73.1727 8.69725C73.6867 7.46369 74.6119 6.74411 76.051 6.74411C77.593 6.74411 78.4154 7.56649 78.4154 9.10844V9.31403L74.9203 10.1364C71.9392 10.7532 70.6028 11.884 70.6028 13.8371C70.6028 15.7902 72.1447 17.0238 74.3035 17.0238ZM78.3126 12.8091C77.9014 14.1455 76.3594 14.9679 75.1259 14.9679C73.9951 14.9679 73.2755 14.3511 73.2755 13.5287C73.2755 12.7063 73.8923 12.1923 75.2287 11.884L78.3126 11.1644V12.8091ZM50.9673 6.74592C49.3226 6.74592 47.575 8.49347 47.2666 9.21305C46.9582 9.93263 45.6219 14.7641 45.6219 14.7641C45.8422 14.7641 46.0626 14.7936 46.2671 14.821C46.4443 14.8447 46.6095 14.8669 46.7527 14.8669C47.1638 14.9697 47.575 14.9697 47.9862 14.9697C50.7617 14.9697 52.4065 11.8858 52.4065 9.62424C52.5093 8.08228 52.3037 6.74592 50.9673 6.74592ZM32.9779 22.6794C34.8282 22.6794 35.6506 20.3151 36.3702 18.0536C36.3702 17.9508 36.3959 17.8737 36.4216 17.7966C36.4473 17.7195 36.473 17.6424 36.473 17.5396L36.5758 17.1284C35.3422 17.4368 34.3142 17.7452 33.4918 18.1564C30.0996 19.8011 31.3331 22.6794 32.9779 22.6794ZM39.5569 24.2214C39.5569 24.1186 41.9212 16.4088 41.9212 16.4088C41.0988 16.4088 40.1736 16.4088 39.6597 16.6144C38.2205 22.885 36.5758 24.941 32.4639 24.941C30.9219 24.941 28.7632 24.3242 28.7632 21.8571C28.7632 19.3899 30.4079 17.0256 37.0897 15.1753L37.0898 15.1752C37.1926 14.8668 37.2953 14.5584 37.3981 14.1473L37.6037 13.5305C36.3702 14.4557 34.931 14.9697 33.3891 14.9697C32.2583 14.9697 30.6135 14.0445 30.6135 12.297C30.6135 12.0914 30.6135 11.8858 30.7163 11.5774C31.2303 9.31585 31.8471 7.05432 32.6695 4.89558C32.8751 4.3816 33.2863 4.48439 33.2863 4.48439H35.3422C35.3422 4.48439 35.8562 4.48439 35.6506 4.89558C35.5694 5.1087 35.4872 5.32281 35.4047 5.53773L35.4046 5.53809L35.4044 5.53864C34.6513 7.50046 33.8725 9.52926 33.5946 11.4746C33.4918 11.9886 33.6974 12.3998 33.903 12.7081C34.7254 13.5305 36.473 12.5026 37.5009 11.3718C38.4261 10.241 38.9401 8.69907 39.3513 7.25991C39.5569 6.74592 39.7625 5.61516 39.8653 4.99838C39.9681 4.58719 40.482 4.58719 40.482 4.58719H42.8464C43.2576 4.58719 43.1548 4.89558 43.1548 4.89558L40.1736 14.6613C40.8932 14.5585 41.6128 14.4557 42.3324 14.4557H42.538L45.5191 4.89558C45.5191 4.68999 45.8275 4.48439 46.0331 4.58719H48.3974C48.603 4.58719 48.8086 4.68999 48.7058 4.99838C48.5002 5.40956 48.3974 6.02635 48.3974 6.02635C49.5282 5.10117 50.7617 4.79278 51.4813 4.79278C54.9764 4.79278 55.7988 7.5683 55.7988 9.62424C55.7988 12.9137 52.7149 17.1284 48.9114 17.1284C48.2728 17.1284 47.7151 17.0474 47.0947 16.9574L47.0946 16.9573L47.0944 16.9573C47.0159 16.9459 46.9363 16.9344 46.8554 16.9228C46.3415 16.82 45.7247 16.7172 45.1079 16.7172C44.9362 17.2322 44.7964 17.7791 44.653 18.3401C44.5388 18.7869 44.4222 19.2426 44.2855 19.6983C44.2855 19.9039 44.1827 20.1095 44.0799 20.3151C43.9121 20.9864 43.5921 22.1142 43.3352 23.0195L43.335 23.0203L43.335 23.0204C43.1199 23.7784 42.9492 24.3802 42.9492 24.427C42.9492 24.6326 42.7436 24.7354 42.6408 24.7354H39.7625C39.6597 24.5298 39.5569 24.3242 39.5569 24.2214ZM46.1365 22.9883H45.0057H44.9029V23.0911H45.4169V24.4274H45.6225V23.0911H46.1365V22.9883ZM47.4712 22.9883H47.7796V24.4274H47.574V23.0911L47.4712 23.3995L47.06 24.5302H46.9572L46.546 23.3995L46.4432 23.1939V24.5302H46.3404V23.0911H46.6488L46.9572 24.119L47.06 24.3246L47.1628 24.119L47.4712 22.9883Z"
      fill="#FAFAFA"
    />
  </svg>
)

const BreatherLogo = () => (
  <svg
    width="120"
    height="23"
    viewBox="0 0 120 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.293701 11.4591C0.293701 5.5119 5.13083 0.675781 11.0782 0.675781C17.0237 0.675781 21.8606 5.5119 21.8606 11.4591C21.8606 17.4065 17.0237 22.2427 11.0782 22.2427C5.13083 22.2427 0.293701 17.4065 0.293701 11.4591ZM11.7779 20.9495C11.8622 21.025 11.9748 21.0607 12.0871 21.0481C16.932 20.5412 20.72 16.433 20.72 11.4579C20.72 6.13989 16.394 1.81317 11.0771 1.81317C5.75691 1.81317 1.43002 6.13989 1.43002 11.4579C1.43002 16.433 5.22003 20.5412 10.0649 21.0481C10.1772 21.0607 10.2903 21.025 10.3741 20.9495C10.4584 20.8734 10.5067 20.7639 10.5067 20.6507V18.1609C10.5067 17.9821 10.3845 17.8217 10.2101 17.7756L6.67414 16.8287C6.37151 16.7485 6.19108 16.4352 6.27264 16.1321C6.35448 15.8267 6.66507 15.6482 6.9688 15.7281L10.0014 16.5404C10.1228 16.572 10.2519 16.5467 10.3502 16.4712C10.4477 16.3951 10.5067 16.2795 10.5067 16.1551V15.1748C10.5067 14.9935 10.3867 14.8378 10.212 14.7895L5.532 13.4953C5.22855 13.411 5.05169 13.0976 5.136 12.7945C5.21838 12.491 5.53282 12.3123 5.83573 12.3966L9.99977 13.5477C10.1195 13.5815 10.2477 13.5562 10.3491 13.4829C10.4477 13.4068 10.5067 13.2868 10.5067 13.1624V12.201C10.5067 12.0198 10.3845 11.86 10.2101 11.8138L6.67414 10.8686C6.37151 10.7868 6.19108 10.4754 6.27264 10.1703C6.35448 9.86687 6.66507 9.68618 6.9688 9.76829L10.0014 10.5803C10.1228 10.6122 10.2519 10.5866 10.3502 10.5108C10.4477 10.4356 10.5067 10.3178 10.5067 10.1934V9.22319C10.5067 9.04195 10.3837 8.8824 10.2079 8.83572L7.94974 8.23817C7.64656 8.15798 7.46504 7.84658 7.54468 7.54369C7.62569 7.2386 7.93711 7.05763 8.24001 7.13754L10.0036 7.603C10.1239 7.63431 10.2519 7.60877 10.3502 7.53105C10.4488 7.45773 10.5067 7.33965 10.5067 7.21553V4.79541C10.5067 4.47961 10.7616 4.22505 11.0771 4.22505C11.3907 4.22505 11.6453 4.47961 11.6453 4.79541V7.21553C11.6453 7.33965 11.7032 7.45773 11.801 7.53105C11.9001 7.60877 12.0284 7.63431 12.1487 7.603L13.9109 7.13754C14.2152 7.05763 14.5266 7.2386 14.6073 7.54369C14.6875 7.84658 14.5054 8.15798 14.2012 8.23817L11.943 8.83572C11.7675 8.8824 11.6453 9.04195 11.6453 9.22319V10.1934C11.6453 10.3178 11.7032 10.4356 11.801 10.5108C11.9001 10.5866 12.0303 10.6122 12.1495 10.5803L15.1821 9.76829C15.4872 9.68618 15.7975 9.86687 15.8796 10.1703C15.9617 10.4754 15.7797 10.7868 15.4754 10.8686L11.9421 11.8138C11.7667 11.86 11.6453 12.0198 11.6453 12.201V13.1624C11.6453 13.2868 11.7046 13.4068 11.8032 13.4829C11.9031 13.5562 12.0328 13.5815 12.1528 13.5477L16.3163 12.3966C16.6194 12.3145 16.9328 12.491 17.016 12.7945C17.1003 13.0976 16.9223 13.411 16.6194 13.4953L11.9391 14.7895C11.7653 14.8378 11.6453 14.9935 11.6453 15.1748V16.1551C11.6453 16.2795 11.7032 16.3951 11.801 16.4712C11.9001 16.5467 12.0303 16.572 12.1495 16.5404L15.1821 15.7281C15.4872 15.6482 15.7975 15.8267 15.8796 16.1321C15.9617 16.4352 15.7797 16.7485 15.4754 16.8287L11.9421 17.7756C11.7667 17.8217 11.6453 17.9821 11.6453 18.1609V20.6507C11.6453 20.7639 11.6936 20.8734 11.7779 20.9495ZM27.103 20.3462C26.5783 20.3462 26.1731 19.9097 26.1731 19.4002V3.34512C26.1731 2.81129 26.5783 2.39934 27.0789 2.39934C27.6034 2.39934 28.0089 2.81129 28.0089 3.34512V10.2085C29.0102 8.70489 30.4644 7.41968 32.7291 7.41968C35.6855 7.41968 38.618 9.79625 38.618 13.9191V13.9676C38.618 18.0664 35.7091 20.4915 32.7291 20.4915C30.4406 20.4915 28.9625 19.2303 28.0089 17.8238V19.4002C28.0089 19.9097 27.6275 20.3462 27.103 20.3462ZM27.9379 13.9687C27.9379 16.8789 30.1071 18.8195 32.3959 18.8195C34.7801 18.8195 36.735 17.0247 36.735 13.9933V13.9442C36.735 10.9858 34.7324 9.09425 32.3959 9.09425C30.1071 9.09425 27.9379 11.0586 27.9379 13.9202V13.9687ZM42.22 20.3463C41.6955 20.3463 41.29 19.9338 41.29 19.4002V8.51083C41.29 8.00155 41.6955 7.56505 42.1959 7.56505C42.7204 7.56505 43.1259 7.97728 43.1259 8.51083V10.8634C44.0317 8.77775 45.8196 7.51653 47.3692 7.51653C47.9179 7.51653 48.2754 7.92875 48.2754 8.4623C48.2754 8.97159 47.9417 9.33529 47.4649 9.40835C45.0807 9.69953 43.1259 11.518 43.1259 15.1321V19.4002C43.1259 19.9098 42.7445 20.3463 42.22 20.3463ZM54.8068 8.99699C52.6612 8.99699 51.0397 10.8158 50.8017 13.2651H58.7404C58.5499 10.9856 57.2626 8.99699 54.8068 8.99699ZM60.0283 18.0202C60.0283 18.2383 59.9328 18.4567 59.742 18.6265C58.5738 19.7664 57.1911 20.5181 55.0931 20.5181C51.7079 20.5181 48.9421 17.8749 48.9421 13.9947V13.9456C48.9421 10.3324 51.4458 7.42223 54.8549 7.42223C58.5022 7.42223 60.5766 10.4537 60.5766 13.7763C60.5766 14.2853 60.1711 14.649 59.7184 14.649H50.8021C51.0642 17.3653 52.9472 18.8932 55.1406 18.8932C56.6666 18.8932 57.7872 18.2874 58.693 17.4381C58.8361 17.3168 59.0031 17.22 59.2175 17.22C59.6707 17.22 60.0283 17.5837 60.0283 18.0202ZM71.2333 18.3334C70.3749 19.473 68.9445 20.4916 66.7747 20.4916C64.4862 20.4916 62.1735 19.1576 62.1735 16.5872V16.5386C62.1735 13.8949 64.3192 12.4881 67.4426 12.4881C69.0158 12.4881 70.1364 12.7064 71.2333 13.0216V12.5851C71.2333 10.3299 69.874 9.16543 67.5619 9.16543C66.3221 9.16543 65.2728 9.45661 64.3669 9.86884C64.2479 9.91764 64.1287 9.94163 64.0333 9.94163C63.6042 9.94163 63.2228 9.57821 63.2228 9.14144C63.2228 8.75348 63.4849 8.4623 63.7232 8.36524C64.9394 7.83197 66.1787 7.51653 67.7524 7.51653C69.4926 7.51653 70.8275 7.97728 71.7337 8.89879C72.5683 9.74779 72.9973 10.9602 72.9973 12.5611V19.4248C72.9973 19.958 72.616 20.3463 72.1151 20.3463C71.5906 20.3463 71.2333 19.958 71.2333 19.473V18.3334ZM64.0322 16.5152C64.0322 18.0916 65.4626 19.0131 67.1318 19.0131C69.3962 19.0131 71.2559 17.6065 71.2559 15.6182V14.4052C70.3497 14.1386 69.134 13.872 67.6321 13.872C65.3195 13.872 64.0322 14.8903 64.0322 16.4666V16.5152ZM82.008 20.1002C81.4835 20.3183 80.9116 20.4396 80.196 20.4396C78.2173 20.4396 76.7154 19.4453 76.7154 16.8989V9.33184H75.7141C75.285 9.33184 74.9034 8.94388 74.9034 8.50739C74.9034 8.04663 75.285 7.68294 75.7141 7.68294H76.7154V4.72401C76.7154 4.21444 77.0968 3.7785 77.6213 3.7785C78.1222 3.7785 78.5513 4.21444 78.5513 4.72401V7.68294H81.7459C82.1989 7.68294 82.5805 8.07062 82.5805 8.50739C82.5805 8.96815 82.1989 9.33184 81.7459 9.33184H78.5513V16.656C78.5513 18.1841 79.3856 18.7419 80.6254 18.7419C81.0629 18.7419 81.3571 18.6635 81.5457 18.6132C81.6346 18.5895 81.7001 18.5721 81.7459 18.5721C82.175 18.5721 82.5325 18.9358 82.5325 19.3722C82.5325 19.712 82.3178 19.9786 82.008 20.1002ZM85.9207 20.3462C85.3959 20.3462 84.9907 19.9337 84.9907 19.4002V3.34512C84.9907 2.83583 85.3959 2.39934 85.8965 2.39934C86.421 2.39934 86.8265 2.83583 86.8265 3.34512V9.86877C87.6367 8.51077 88.9242 7.41968 91.0463 7.41968C94.0263 7.41968 95.7665 9.45654 95.7665 12.4397V19.4002C95.7665 19.9337 95.3615 20.3462 94.8606 20.3462C94.3361 20.3462 93.9312 19.9337 93.9312 19.4002V12.9008C93.9312 10.5725 92.6914 9.11711 90.5216 9.11711C88.3997 9.11711 86.8265 10.6935 86.8265 13.0461V19.4002C86.8265 19.9337 86.4452 20.3462 85.9207 20.3462ZM104.061 8.99699C101.915 8.99699 100.294 10.8158 100.055 13.2651H107.994C107.804 10.9856 106.516 8.99699 104.061 8.99699ZM109.282 18.0202C109.282 18.2383 109.186 18.4567 108.995 18.6265C107.827 19.7664 106.445 20.5181 104.347 20.5181C100.961 20.5181 98.1955 17.8749 98.1955 13.9947V13.9456C98.1955 10.3324 100.699 7.42223 104.108 7.42223C107.756 7.42223 109.83 10.4537 109.83 13.7763C109.83 14.2853 109.425 14.649 108.972 14.649H100.056C100.318 17.3653 102.201 18.8932 104.394 18.8932C105.92 18.8932 107.041 18.2874 107.947 17.4381C108.09 17.3168 108.257 17.22 108.471 17.22C108.924 17.22 109.282 17.5837 109.282 18.0202ZM113.288 20.3463C112.763 20.3463 112.358 19.9338 112.358 19.4002V8.51083C112.358 8.00155 112.763 7.56505 113.264 7.56505C113.788 7.56505 114.194 7.97728 114.194 8.51083V10.8634C115.1 8.77775 116.888 7.51653 118.437 7.51653C118.986 7.51653 119.343 7.92875 119.343 8.4623C119.343 8.97159 119.009 9.33529 118.532 9.40835C116.149 9.69953 114.194 11.518 114.194 15.1321V19.4002C114.194 19.9098 113.812 20.3463 113.288 20.3463Z"
      fill="#FAFAFA"
    />
  </svg>
)

const UnbounceLogo = () => (
  <svg
    width="129"
    height="26"
    viewBox="0 0 129 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.9393 0.0117188C5.95082 0.0117188 0.293457 5.63319 0.293457 12.5774C0.293457 19.5215 5.95082 25.143 12.9393 25.143C19.9278 25.143 25.5852 19.5215 25.5852 12.5774C25.5852 5.63319 19.9278 0.0117188 12.9393 0.0117188ZM12.4877 17.5139L11.5606 20.2301C11.5369 20.3246 11.4893 20.3955 11.4418 20.4663C11.3229 20.6553 11.1803 20.797 10.9901 20.8915C10.8238 20.986 10.6336 21.0332 10.4434 21.0332C10.3246 21.0332 10.182 21.0096 10.0631 20.9623C9.54015 20.7734 9.20737 20.2537 9.27868 19.7341C6.66393 18.4114 4.88115 15.6952 4.88115 12.5774C4.88115 8.13687 8.49425 4.52307 12.9869 4.52307C13.5098 4.52307 14.009 4.57031 14.5082 4.66479C14.7934 4.21601 15.3639 4.00344 15.8869 4.16877C16.1721 4.26325 16.386 4.45221 16.5287 4.68841C16.6475 4.90098 16.7188 5.13718 16.695 5.397C16.695 5.49147 16.6713 5.58595 16.6475 5.65681L15.7205 8.37307L12.4877 17.5139ZM13.5098 20.608L14.627 17.2541C16.5524 16.5691 17.9311 14.7504 17.9311 12.5774C17.9311 11.5617 17.6221 10.5933 17.0754 9.81387L18.1926 6.45988C19.9278 7.9243 21.045 10.1209 21.045 12.5774C21.0213 16.8289 17.7172 20.301 13.5098 20.608ZM66.304 12.53C66.304 15.6477 64.1171 18.0097 61.2409 18.0097C59.6008 18.0097 58.1745 17.3484 57.1999 16.1438L56.8909 15.7895V17.7263C56.8909 17.7499 56.8672 17.7735 56.8434 17.7735H54.3C54.2762 17.7735 54.2524 17.7499 54.2524 17.7263V2.18455C54.2524 2.16094 54.2762 2.13732 54.3 2.13732H57.0098C57.0336 2.13732 57.0573 2.16094 57.0573 2.18455V9.08149L57.3663 8.75081C58.3409 7.61707 59.7196 7.00296 61.2409 7.00296C64.0934 7.00296 66.304 9.43578 66.304 12.53ZM63.7844 12.5063C63.7844 10.6876 62.4532 9.36492 60.6467 9.36492C58.8401 9.36492 57.4614 10.7349 57.4614 12.53C57.4614 14.2778 58.8639 15.6477 60.6467 15.6477C62.4294 15.6477 63.7844 14.3014 63.7844 12.5063ZM73.7211 6.90625C70.2506 6.90625 67.6121 9.33907 67.6121 12.5513C67.6121 15.7636 70.2268 18.1964 73.7211 18.1964C77.2153 18.1964 79.8538 15.7636 79.8538 12.5513C79.8538 9.31545 77.2153 6.90625 73.7211 6.90625ZM73.7211 15.8581C71.9145 15.8581 70.5358 14.4409 70.5358 12.5513C70.5358 10.6854 71.9383 9.24459 73.7211 9.24459C75.5276 9.24459 76.9301 10.709 76.9301 12.5513C76.9301 14.3937 75.5038 15.8581 73.7211 15.8581ZM128.013 16.5194C126.658 17.5823 124.804 18.1964 122.973 18.1964C119.123 18.1964 116.65 15.9762 116.627 12.5513C116.627 10.9924 117.197 9.55165 118.219 8.53601C119.289 7.47312 120.81 6.90625 122.522 6.90625H122.593C125.731 6.92987 128.298 9.52803 128.298 12.6931V13.2836H119.622L119.646 13.4725C119.931 15.1495 121.096 16.047 123.021 16.047C124.305 16.047 125.517 15.6455 126.634 14.8661C126.634 14.8424 126.658 14.8424 126.682 14.8661L128.013 16.4722C128.037 16.4722 128.037 16.4958 128.013 16.5194ZM122.522 9.10288C121.214 9.10288 120.264 9.78785 119.859 11.0397C119.812 11.1578 119.836 11.2759 119.931 11.3704C120.002 11.4648 120.121 11.5357 120.24 11.5357H124.828C124.946 11.5357 125.065 11.4648 125.137 11.3704C125.208 11.2759 125.232 11.1578 125.184 11.0397C124.756 9.78785 123.829 9.10288 122.522 9.10288ZM111.587 18.2427C108.093 18.2427 105.478 15.8098 105.478 12.5976C105.478 9.3853 108.093 6.95248 111.563 6.95248C113.299 6.95248 114.891 7.56659 116.032 8.65309L114.416 10.4482C113.75 9.64512 112.8 9.19634 111.777 9.19634C111.183 9.19634 110.613 9.33806 110.113 9.6215C109.543 9.92855 109.068 10.3773 108.759 10.9914C108.747 11.0151 108.735 11.0446 108.723 11.0741C108.711 11.1037 108.699 11.1332 108.687 11.1568C108.521 11.5111 108.426 11.9126 108.378 12.2905V12.3378V12.385V12.5976V12.6684V12.881C108.378 12.9046 108.384 12.9342 108.39 12.9637C108.396 12.9932 108.402 13.0227 108.402 13.0463L108.426 13.1644C108.426 13.2205 108.441 13.2766 108.459 13.3444L108.466 13.3713L108.473 13.4006C108.521 13.5896 108.568 13.7549 108.64 13.9203C108.925 14.6289 109.472 15.2194 110.137 15.55L110.185 15.5736L110.209 15.5973C110.232 15.6209 110.256 15.6445 110.28 15.6445C110.755 15.8807 111.254 15.9988 111.777 15.9988C112.8 15.9988 113.774 15.5264 114.392 14.747L116.009 16.4948V16.5657C114.868 17.6522 113.299 18.2427 111.587 18.2427ZM103.861 17.7272V12.2238C103.766 9.72011 103.077 7.40539 98.8693 7.40539C97.9898 7.40539 97.2054 7.52349 96.5398 7.7833L96.3021 7.87778V7.45263C96.3021 7.42901 96.2784 7.42901 96.2784 7.42901H93.9251C93.9013 7.42901 93.9013 7.45263 93.9013 7.45263V17.7272C93.9013 17.7508 93.9251 17.7744 93.9488 17.7744H96.6587C96.6824 17.7744 96.7062 17.7508 96.7062 17.7272V11.9404C96.7062 11.6097 96.7538 11.3026 96.8251 11.0192C97.1341 10.2161 97.9661 9.64925 98.8931 9.62564C99.7964 9.62564 100.652 10.1925 100.961 10.9956C101.056 11.279 101.08 11.5861 101.08 11.9167V17.7036C101.08 17.7272 101.104 17.7508 101.128 17.7508H103.837C103.837 17.7744 103.861 17.7508 103.861 17.7272ZM81.5878 12.9796V7.45263C81.5878 7.42901 81.6116 7.40539 81.6353 7.40539H84.3452C84.3689 7.40539 84.3927 7.42901 84.3927 7.45263V13.2631C84.3927 13.5937 84.4165 13.9008 84.5116 14.1842C84.8206 14.9873 85.6763 15.5542 86.5796 15.5542C87.5066 15.5305 88.3386 14.9637 88.6476 14.1606C88.7189 13.8772 88.7665 13.5701 88.7665 13.2394V7.45263C88.7665 7.42901 88.7902 7.40539 88.814 7.40539H91.5238C91.5476 7.40539 91.5714 7.42901 91.5714 7.45263V12.8615C91.4763 14.9637 90.8583 17.798 86.5796 17.798C82.3722 17.798 81.6829 15.4833 81.5878 12.9796ZM52.0665 17.7744C52.0902 17.7744 52.114 17.7508 52.114 17.7272V12.2238C52.0189 9.72011 51.3296 7.40539 47.1222 7.40539C46.2427 7.40539 45.4583 7.52349 44.7927 7.7833L44.555 7.87778V7.45263C44.555 7.42901 44.5312 7.42901 44.5075 7.42901H42.1542C42.1304 7.42901 42.1304 7.45263 42.1304 7.45263V17.7272C42.1304 17.7508 42.1542 17.7744 42.178 17.7744H44.8878C44.9116 17.7744 44.9353 17.7508 44.9353 17.7272V11.9404C44.9353 11.6097 44.9829 11.3026 45.0542 11.0192C45.3632 10.2161 46.1952 9.64925 47.1222 9.62564C48.0255 9.62564 48.8812 10.1925 49.1903 10.9956C49.2853 11.279 49.3091 11.5861 49.3091 11.9167V17.7036C49.3091 17.7272 49.3329 17.7508 49.3566 17.7508H52.0665V17.7744ZM30.0061 12.9796V7.45263C30.0061 7.42901 30.0061 7.40539 30.0537 7.40539H32.7635C32.7873 7.40539 32.811 7.42901 32.811 7.45263V13.2631C32.811 13.5937 32.8348 13.9008 32.9299 14.1842C33.2389 14.9873 34.0946 15.5542 34.9979 15.5542C35.925 15.5305 36.7569 14.9637 37.0659 14.1606C37.1372 13.8772 37.1848 13.5701 37.1848 13.2394V7.45263C37.1848 7.42901 37.2086 7.40539 37.2323 7.40539H39.9422C39.9659 7.40539 39.9897 7.42901 39.9897 7.45263V12.8615C39.8946 14.9637 39.2766 17.798 34.9979 17.798C30.7905 17.798 30.1012 15.4833 30.0061 12.9796ZM10.2537 16.7573C8.87502 15.8598 7.94797 14.3245 7.94797 12.5766C7.94797 9.83677 10.1824 7.61652 12.9398 7.61652C13.0824 7.61652 13.2488 7.61652 13.3914 7.64014L10.2537 16.7573Z"
      fill="#FAFAFA"
    />
  </svg>
)

const RitualLogo = () => (
  <svg
    width="52"
    height="17"
    viewBox="0 0 52 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9365 16.0149L8.64408 11.1201C10.6411 10.13 11.7575 8.38099 11.7575 6.21613C11.7575 2.97729 9.32454 0.541969 5.0044 0.541969H0V16.0149H2.79996V11.8897H5.84731L8.58041 16.0149H11.9365ZM5.29084 9.04484H2.79996V3.38712H5.29084C7.27464 3.38712 8.81761 4.26833 8.81761 6.21613C8.81776 8.16333 7.27464 9.04484 5.29084 9.04484ZM49.2006 0.541969H52V16.0149H49.2006V0.541969ZM21.4379 7.43175V12.5638C21.4825 13.246 21.7903 13.5652 22.3977 13.5652C23.0043 13.5652 23.4565 13.3003 23.824 13.0089V15.6262C23.2876 16.0001 22.3775 16.271 21.367 16.2116C20.6949 16.1717 19.9071 15.8856 19.3546 15.3216C18.8766 14.7288 18.6374 14.1407 18.6374 13.1417V7.43175H17.2058V4.91875H18.6374V1.30824H21.4379V4.91875H23.3484V7.43175H21.4379V7.43175ZM35.3451 16.0126H32.8343L32.5744 14.748C32.0599 15.4141 31.0024 16.1458 29.4599 16.1458C26.6882 16.1458 24.8043 14.5264 24.8043 11.5752V4.9189H27.5746V10.6483C27.5746 12.6007 28.4535 13.4441 30.0635 13.4441C31.6726 13.4441 32.5743 12.2903 32.5743 10.6483V4.9189H35.3449V16.0126H35.3451ZM47.7606 4.93233V16.0149H45.5196L45.2595 14.8621C44.7907 15.4607 43.563 16.1476 42.0667 16.1476C38.874 16.1476 36.4616 13.7981 36.4616 10.4737C36.4616 7.14878 38.874 4.79914 42.0667 4.79914C43.5403 4.79914 44.7907 5.48636 45.2595 6.08475L45.5196 4.93218H47.7606V4.93233ZM42.1523 7.42391C40.4522 7.42391 39.1416 8.80666 39.1416 10.4739C39.1416 12.1407 40.4523 13.5231 42.1523 13.5231C43.8113 13.5231 45.0812 12.1407 45.0812 10.4739C45.0812 8.80666 43.8113 7.42391 42.1523 7.42391ZM13.108 4.91845H15.9078V16.0146H13.108V4.91845ZM16.3167 1.8309C16.3167 2.84228 15.5017 3.6621 14.4967 3.6621C13.4915 3.6621 12.6766 2.84228 12.6766 1.8309C12.6766 0.819817 13.4914 0 14.4967 0C15.5017 0 16.3167 0.819817 16.3167 1.8309Z"
      fill="#FAFAFA"
    />
  </svg>
)
