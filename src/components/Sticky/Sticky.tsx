import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import media from '@styles/media'

import { clamp } from '@utils'

export interface StickyState {
  position: number
  progress: number
}

interface StickyProps {
  children: React.ReactChildren
  render: (props: StickyState) => React.ReactNode
  height?: string
  top?: number
  disableOnMobile?: boolean
  cover?: boolean
}

function Sticky({ cover, height, render, top, disableOnMobile }: StickyProps) {
  const [position, setPosition] = useState(0)
  const [progress, setProgress] = useState(0)
  const element = useRef()

  useEffect(() => {
    function handleScroll() {
      const $el = element.current as HTMLElement

      if ($el) {
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
          (scrollPosition - topOfElement) /
            (heightOfElement - viewportHeight) || 0

        const progress = clamp(progressOverElement, 0, 1)

        setPosition(position)
        setProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [element])

  return (
    <div ref={element} data-component="sticky">
      <StickyDuration height={height}>
        <StickyItemContainer>
          <StickyItem top={top} cover={cover}>
            {render({ progress, position })}
          </StickyItem>
        </StickyItemContainer>
      </StickyDuration>
    </div>
  )
}

export default Sticky

const StickyDuration = styled.div<{ height?: string }>`
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
  width: 100%;
  ${p => p.cover && 'overflow-y: hidden;'};
`
