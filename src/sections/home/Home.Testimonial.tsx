import React from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import Section from '@components/Section'
import media from '@styles/media'

const articlesQuotesQuery = graphql`
  query GetArticleQuotes {
    allContentfulArticleQuote {
      edges {
        node {
          article {
            slug
          }
          company
          largeIcon {
            file {
              url
            }
          }
          smallIcon {
            file {
              url
            }
          }
          quote {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`

function HomeQuote() {
  const {
    allContentfulArticleQuote: { edges: quotes },
  } = useStaticQuery(articlesQuotesQuery)

  const quote = quotes[0].node
  const blockquote = quote.quote.childMarkdownRemark.rawMarkdownBody

  return (
    <Gradient>
      <Grid>
        <SVG src={quote.largeIcon.file.url} />
        <div>
          <Blockquote dangerouslySetInnerHTML={{ __html: `“${blockquote}”` }} />
          <StyledLink to={`/articles/${quote.article.slug}`} data-a11y="false">
            <SVG src={quote.smallIcon.file.url} />
            More on {quote.company}
          </StyledLink>
          <StyledLink to="/articles" data-a11y="false">
            <BookIcon aria-hidden="true" data-a11y="false" />
            All articles
          </StyledLink>
        </div>
      </Grid>
    </Gradient>
  )
}

export default HomeQuote

const Gradient = styled.div`
  padding: 250px 0 150px;
  background: linear-gradient(180deg, #101216 0%, #191d23 100%);

  ${media.tablet`
    padding: 50px 0 115px;
  `}
`

const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 132px 675px;
  grid-column-gap: 131px;

  ${media.tablet`
    display: block;

    & > span > svg {
      width: 94.29px;
      height: 25px;
      margin-bottom:15px;
    }
  `}
`

const Blockquote = styled.blockquote`
  font-family: ${p => p.theme.fontfamily.serif};
  font-style: italic;
  font-size: 36px;
  color: #fafafa;
  margin-bottom: 40px;

  a {
    color: ${p => p.theme.colors.gold};

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  ${media.tablet`
    font-size: 24px;
    margin: 20px 0 45px;
  `}
`

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  position: relative;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.3s var(--ease-out-quad);

  svg {
    margin-right: 13px;

    path {
      transition: fill-opacity 0.3s var(--ease-out-quad);
    }
  }

  &:not(:last-child) {
    margin-right: 60px;
  }

  &:hover {
    color: #fff;

    svg path {
      fill-opacity: 1;
    }
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -50%;
    width: 120%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${media.tablet`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    padding: 15px 0;


    &:not(:last-child) {
      margin-right: 0;
      border-bottom: 1px solid rgba(255,255,255,0.25)};
    }
  `}
`

const BookIcon = () => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.08049 17.6722C7.76458 17.6637 7.45759 17.5655 7.19547 17.389C5.39545 16.1889 3.19257 15.7528 1.0711 16.1765C0.806302 16.2334 0.530005 16.166 0.321224 15.9934C0.112443 15.8209 -0.00583261 15.5622 0.000221597 15.2914V1.56472C0.000221597 1.07593 0.39646 0.679692 0.885246 0.679692H3.38101C4.13236 0.678986 4.8811 0.768121 5.61128 0.945199C5.9164 1.03057 6.1528 1.27224 6.23143 1.57917C6.31005 1.88609 6.21896 2.21166 5.99247 2.43321C5.76597 2.65477 5.43849 2.73867 5.13336 2.6533C4.48691 2.50129 3.82363 2.43288 3.15976 2.44974H1.77027V14.2737C4.00492 14.0698 6.24252 14.6315 8.1159 15.8667C9.98927 14.6315 12.2269 14.0698 14.4615 14.2737V2.50284C12.5572 2.29141 10.6392 2.75836 9.04517 3.82153V12.4063C9.04517 12.8951 8.64893 13.2913 8.16015 13.2913C7.67136 13.2913 7.27512 12.8951 7.27512 12.4063V3.39672C7.27302 3.1197 7.40076 2.85768 7.62028 2.6887C9.8996 0.985765 12.7995 0.341351 15.5855 0.918648C15.9972 1.01136 16.2861 1.38182 16.2758 1.80367V15.3534C16.2819 15.6242 16.1636 15.8828 15.9548 16.0554C15.746 16.2279 15.4697 16.2954 15.2049 16.2384C13.0835 15.8148 10.8806 16.2509 9.08057 17.4509C8.77877 17.628 8.42883 17.7054 8.08049 17.6722Z"
      fill="white"
      fillOpacity="0.25"
    />
  </svg>
)
