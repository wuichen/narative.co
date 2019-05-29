import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'

import CommandLineOptions from './CommandLineOptions'

import shortcuts from '../../shortcuts'
import { useReduxState } from '../../store'
import { CloseIcon } from '../../icons/ui'
import { scrollable } from '@utils'

interface Position {
  symbol: string
  name: string
  label: string
  keys: string[]
}

interface CommandLineProps {
  positions?: Position[]
}

const defaultList = [
  {
    symbol: 'GoToIcon',
    name: 'CONTACT',
    label: 'Contact',
    keys: ['C'],
  },
  {
    symbol: 'GoToIcon',
    name: 'COMMAND_LINE_READ',
    label: 'Read',
    keys: ['shift', 'R'],
  },
  {
    symbol: 'GoToIcon',
    name: 'GO_TO_HOME',
    label: 'Go to Home',
    keys: ['G', 'H'],
  },
  {
    symbol: 'GoToIcon',
    name: 'GO_TO_ARTICLES',
    label: 'Go to Articles',
    keys: ['G', 'A'],
  },
  {
    symbol: 'GoToIcon',
    name: 'GO_TO_CAREERS',
    label: 'Go to Careers',
    keys: ['G', 'C'],
  },
  {
    symbol: 'GoToIcon',
    name: 'GO_TO_LABS',
    label: 'Go to Labs',
    keys: ['G', 'L'],
  },
  {
    symbol: 'GoToIcon',
    name: 'GO_TO_FEY',
    label: 'Go to Fey',
    keys: ['G', 'F'],
  },
]

const articlesQuery = graphql`
  query GetArticles {
    allContentfulArticle(sort: { fields: [publicationDate], order: DESC }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

function createReadingList(articles) {
  return articles.map((article, index) => ({
    symbol: 'ArticleIcon',
    name: 'GO_TO_ARTICLE',
    label: article.node.title,
    slug: article.node.slug,
  }))
}

function CommandLine({ positions }: CommandLineProps) {
  const {
    allContentfulArticle: { edges: articles },
  } = useStaticQuery(articlesQuery)
  const readingList = createReadingList(articles)

  const [{ name }] = useReduxState(state => ({
    name: state.shortcuts.name,
  }))

  const open = name && name.includes('COMMAND_LINE')
  const list = name === 'COMMAND_LINE_DEFAULT' ? defaultList : readingList

  useEffect(() => {
    if (open) {
      scrollable('disable')
    } else {
      scrollable('enable')
    }
  }, [open])

  if (!open) return null

  return (
    <OutsideClickHandler
      onOutsideClick={() => shortcuts.handleShortcutFeature({ name: 'ESCAPE' })}
    >
      <Frame>
        <Header>
          <LogoContainer>
            <Logo />
            <Heading>Narative Command</Heading>
          </LogoContainer>
          <CloseButton
            onClick={() => shortcuts.handleShortcutFeature({ name: 'ESCAPE' })}
          >
            <CloseIcon />
          </CloseButton>
        </Header>
        <CommandLineOptions list={list} name={name} />
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
  height: 419px;
  width: 712px;

  background: rgba(29, 33, 40, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.25);

  border-radius: 5px;
  opacity: 0;

  will-change: opacity, transform;
  animation: ${fadeIn} 0.25s forwards;
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
  margin-left: 21px;
  color: ${p => p.theme.colors.moon};
  font-weight: 400;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 16px;

  svg {
    width: 12px;
  }
`

const CloseButton = styled.button``

const Logo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 23 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Narative</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 30H22.9091V26.4595H0V30Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.00598145 24.7176L7.01982 19.7873L7.01897 15.2965L0.00598145 10.3745V24.7176Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.8917 0L15.8492 4.87412V9.29375L22.894 14.2569L22.8918 0H22.8917Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.0065918 0V8.62637L22.8961 24.7297L22.8948 16.0316L0.0065918 0Z"
      fill="#fff"
    />
  </svg>
)
