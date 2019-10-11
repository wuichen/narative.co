import React, { Component } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

import mediaqueries from '@styles/media'

interface StickyProps {
  children: React.Children
  height: number
  top?: number
  disableOnMobile?: boolean
  render: (props: StickyState) => void
  cover?: boolean
}

interface StickyState {
  position: number
  progress: number
}

class Sticky extends Component<StickyProps, StickyState> {
  element = React.createRef()

  state = {
    position: 0,
    progress: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const $el = this.element.current

    const getOffsetTop = (element: any) => {
      let offsetTop = 0
      while (element) {
        offsetTop += element.offsetTop
        element = element.offsetParent
      }
      return offsetTop
    }

    const scrollPosition = window.pageYOffset || window.scrollY
    const topOfElement = getOffsetTop($el)
    const topOfElementRelativeToDoc = $el.getBoundingClientRect().top
    const heightOfElement = $el.getBoundingClientRect().height

    const scrollPositionRelativeToContainer =
      scrollPosition - topOfElementRelativeToDoc

    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

    const position =
      scrollPositionRelativeToContainer < 0
        ? 0
        : scrollPositionRelativeToContainer

    const progressOverElement =
      (scrollPosition - topOfElement) / (heightOfElement - viewportHeight) || 0

    const progress =
      progressOverElement > 1
        ? 1
        : progressOverElement < 0
        ? 0
        : progressOverElement

    this.setState({ position, progress })
  }

  render() {
    const { cover, height, render, top, disableOnMobile } = this.props

    return (
      <div ref={this.element} data-component="sticky">
        <StickyDuration height={height} isDisabled={disableOnMobile}>
          <StickyItemContainer>
            <StickyItem top={top} isDisabled={disableOnMobile} cover={cover}>
              {render(this.state)}
            </StickyItem>
          </StickyItemContainer>
        </StickyDuration>
      </div>
    )
  }
}

export default Sticky

const StickyDuration = styled.div<{ height: string }>`
  height: ${p => p.height || '100vh'};
`

const StickyItemContainer = styled.div`
  height: 100%;
`

const StickyItem = styled.div<{ top?: number; cover?: boolean }>`
  position: sticky;
  top: ${p => p.top || 0}px;
  min-height: initial;
  height: ${p => (p.cover ? '100vh' : 'initial')};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  ${p => p.cover && 'overflow-y: hidden;'};
`
