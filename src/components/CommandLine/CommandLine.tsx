import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'

import CommandLineOptions from '@components/CommandLine/CommandLine.Options'
import CommandLineTips from '@components/CommandLine/CommandLine.Tips'

import shortcuts, { constants } from '../../shortcuts'
import { useReduxState } from '../../store'
import { CloseIcon, ViewIcon, BookIcon } from '../../icons/ui'
import { scrollable } from '@utils'

interface Shortcut {
  symbol: string
  name: string
  label: string
  keys: string[]
}

const articlesQuery = graphql`
  query GetArticles {
    allContentfulArticle(sort: { fields: [publicationDate], order: DESC }) {
      edges {
        node {
          title
          slug
          featured
        }
      }
    }
  }
`

function createReadingList(articles) {
  return [
    {
      name: constants.GO_TO_ARTICLES,
      keys: ['G', 'A'],
      label: ['All ', 'Articles'],
      icon: BookIcon,
    },
    ...articles.map(article => ({
      symbol: 'ArticleIcon',
      name: constants.GO_TO_ARTICLE,
      label: [`${article.node.title}`],
      search: article.node.title,
      path: article.node.slug,
      featured: article.node.featured,
      icon: ViewIcon,
    })),
  ]
}

function CommandLineHeading({ isDefault }) {
  return isDefault ? (
    <>
      <Logo />
      <Heading>Narative Command</Heading>
    </>
  ) : (
    <BackButton
      onClick={() =>
        shortcuts.handleShortcutFeature({
          name: constants.COMMAND_LINE_DEFAULT,
        })
      }
    >
      <BackArrow />
      <Heading>Back</Heading>
    </BackButton>
  )
}

function CommandLine() {
  const [{ name }] = useReduxState(state => ({
    name: state.shortcuts.name,
  }))
  const { allContentfulArticle } = useStaticQuery(articlesQuery)
  const readingList = createReadingList(allContentfulArticle.edges)

  const open = name && name.includes('COMMAND_LINE')
  const isDefault = name === constants.COMMAND_LINE_DEFAULT
  const list = isDefault ? shortcuts.getShortcutsFiltered() : readingList
  const close = () =>
    shortcuts.handleShortcutFeature({ name: constants.ESCAPE })

  useEffect(() => {
    if (open) return scrollable('disable')
    scrollable('enable')
  }, [open])

  // This component is mounted, but not returning anything until it's open!
  if (!open) return <CommandLineTips />

  return (
    <OutsideClickHandler onOutsideClick={close}>
      <Frame>
        <Header>
          <LogoContainer>
            <CommandLineHeading isDefault={isDefault} />
          </LogoContainer>
          <CloseButton onClick={close}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <CommandLineOptions key={name} list={list} name={name} />
      </Frame>
    </OutsideClickHandler>
  )
}

export default CommandLine

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`

const Frame = styled.div`
  z-index: 2147483647;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  height: 418px;
  width: 712px;

  background: rgba(29, 33, 40, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.25);

  border-radius: 5px;
  opacity: 0;

  will-change: opacity, transform;
  animation: ${fadeIn} 0.25s forwards;
  overflow: hidden;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(115, 115, 125, 0.3);
`

const Heading = styled.h1`
  font-size: 16px;
  margin-left: 15px;
  color: ${p => p.theme.colors.moon};
  font-weight: 400;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
`

const CloseButton = styled.button``

const Logo = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.9336 15.2598H3V17.2546H15.9336V15.2598Z" fill="#FAFAFA" />
    <path
      d="M3.00391 6.19336V14.2761L6.96385 11.4983V8.96641L3.00391 6.19336Z"
      fill="#FAFAFA"
    />
    <path
      d="M15.9244 8.37989L15.9229 0.345703L11.9473 3.09214V5.58335L15.9244 8.37989Z"
      fill="#FAFAFA"
    />
    <path
      d="M15.9266 14.283V9.38044L3.00391 0.345703V5.20599L15.9266 14.283Z"
      fill="#FAFAFA"
    />
  </svg>
)

const BackArrow = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.5"
      y="17"
      width="16"
      height="16"
      rx="2.5"
      transform="rotate(-90 1.5 17)"
      fill="white"
      fillOpacity="0.95"
    />
    <path
      d="M9.44125 12.9004L9.44125 11.4504L12.5 11.4504C12.7485 11.4504 12.95 11.2489 12.95 11.0004L12.95 7.20039C12.95 7.08104 12.9026 6.96658 12.8182 6.88219C12.7338 6.7978 12.6193 6.75039 12.5 6.75039L9.44125 6.75039L9.44125 5.30039C9.44125 5.11491 9.32745 4.94843 9.15462 4.8811C8.9818 4.81376 8.78536 4.85936 8.65987 4.99594L5.16862 8.79594C5.01046 8.96809 5.01046 9.23269 5.16863 9.40484L8.65987 13.2048C8.78536 13.3414 8.9818 13.387 9.15462 13.3197C9.32745 13.2523 9.44125 13.0859 9.44125 12.9004Z"
      stroke="#08080B"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  </svg>
)
