import React from 'react'
import { graphql } from 'gatsby'

import Divider from '@components/Divider'
import Layout from '@components/Layout'
import SEO from '@components/SEO'

import AboutHero from '../sections/about/About.Hero'
import AboutTeam from '../sections/about/About.Team'
import AboutChoose from '../sections/about/About.Choose'
import AboutWork from '../sections/about/About.Work'
import AboutIndependent from '../sections/about/About.Independent'

function AboutPage({ data, location }) {
  const contentful = data.allContentfulPage.edges[0].node
  const pageBackground =
    'linear-gradient(rgb(9, 10, 12),rgb(17, 18, 22) 60%,#1a1e24 100%)'

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  const footerConfig = {
    visible: true,
  }

  return (
    <Layout background={pageBackground} nav={navConfig} footer={footerConfig}>
      <SEO
        title={contentful.seo.title}
        description={contentful.seo.description}
        image={contentful.seo.image.file.url}
        pathname={location.pathname}
      />
      <AboutHero />
      <AboutTeam />
      <Divider />
      <AboutChoose />
      <Divider />
      <AboutWork />
      <AboutIndependent />
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageQuery {
    allContentfulPage(filter: { pageName: { eq: "About" } }) {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`
