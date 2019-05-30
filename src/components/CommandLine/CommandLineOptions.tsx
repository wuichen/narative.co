import React, { useState, ReactElement, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import styled from 'styled-components'

import shortcuts from '../../shortcuts'
import { keyToSymbol } from '../../shortcuts/shortcuts'

interface CommandProps {
  list?: any[]
  name: string
}

function handleShortcutSelection(shortcut: { name: string }) {
  shortcuts.handleShortcutFeature(shortcut)
}

function useActiveListItem(initial: number, list: any[], name: string): number {
  const [active, setActive] = useState<number>(initial)
  const length: number = list.length

  useEffect(() => {
    setActive(0)
  }, [name])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          setActive(currentActive => {
            if (currentActive === 0) return length - 1

            return currentActive - 1
          })
          break
        case 'ArrowDown':
          setActive(currentActive => {
            if (currentActive === length - 1) return 0

            return currentActive + 1
          })
          break
        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [length])

  if (active >= length) {
    setActive(length - 1)
  }

  return active > 0 ? active : 0
}

function CommandLineOptions({ list = [], name }: CommandProps) {
  const fuseOptions = {
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 20,
    minMatchCharLength: 2,
    keys: ['search'],
  }

  const filteredList = list
    .filter(item => item.label)
    .map(item => ({ ...item, search: item.label.join('') }))

  const fuse = new Fuse(filteredList, fuseOptions)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [value, setValue] = useState('')

  const results = value ? fuse.search(value) : list
  const activeCommand = useActiveListItem(0, results, name)
  const placeholder =
    name === 'COMMAND_LINE_READ' ? 'Choose your article' : 'Type your command'

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  if (listRef.current) {
    if (activeCommand > 3) {
      listRef.current.scrollTo({ top: (activeCommand - 3) * 61 })
    } else {
      listRef.current.scrollTo({ top: 0 })
    }
  }

  useEffect(() => {
    setValue('')
  }, [list])

  return (
    <>
      <Form
        onSubmit={event => {
          event.preventDefault()
          handleShortcutSelection(results[activeCommand])
        }}
      >
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          id="CommandLineInput"
          autoComplete="Off"
          onChange={event => {
            setValue(event.target.value)
          }}
        />
      </Form>
      <List ref={listRef}>
        {results.map((shortcut: any, index) => {
          const highlight = index === activeCommand

          return (
            <Shortcut
              key={shortcut.search}
              highlight={highlight}
              onClick={() => handleShortcutSelection(results[index])}
            >
              {labelToHighlighted(shortcut.label, shortcut.icon, highlight)}
              <ShortcutKeys>
                {shortcut.keys &&
                  shortcut.keys.map((key: any) => {
                    let symbol = keyToSymbol(key)
                    if (typeof symbol === 'function') symbol = symbol()

                    return <Symbol key={key}>{symbol}</Symbol>
                  })}
                {shortcut.featured && <Featured>Featured</Featured>}
                {shortcut.external && <ExternalIcon />}
              </ShortcutKeys>
            </Shortcut>
          )
        })}
      </List>
    </>
  )
}

export default CommandLineOptions

const labelToHighlighted = (
  label: string,
  icon: React.ReactElement,
  highlight?: boolean
): ReactElement => {
  const fill: string = highlight ? '#6166DC' : '#73737D'
  const Icon = icon

  return (
    <Label>
      <Icon fill={fill} />
      <LabelText>
        <Regular highlight={highlight} label={label[0]}>
          {label[0]}
        </Regular>
        <Highlight highlight={highlight}>{label[1]}</Highlight>
      </LabelText>
    </Label>
  )
}

const Label = styled.div`
  display: flex;
  align-items: center;
`

const LabelText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 14px;
`

const Regular = styled.div<{ highlight: boolean | undefined }>`
  color: ${p => (p.highlight ? '#fff' : p.theme.colors.moon)};
  ${p => p.label && `margin-right: 5px`};
`

const Highlight = styled.div<{ highlight: boolean | undefined }>`
  color: ${p => (p.highlight ? '#fff' : p.theme.colors.moon)};
  font-weight: 600;
`

const Form = styled.form`
  padding: 24px 24px 0 24px;
  margin-bottom: 30px;
`

const List = styled.ul`
  position: relative;
  list-style: none;
  height: 246px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Shortcut = styled.li<{ highlight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${p => (p.highlight ? 'rgba(17, 18, 22, 0.5)' : 'transparent')};
  padding: 0 24px;
  height: 61px;
  font-size: 18px;
  color: ${p => p.theme.colors.moon};
  cursor: pointer;

  svg {
    position: relative;
    left: -3px;
  }
`

const ShortcutKeys = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
`

const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 4px;
  color: #000;
  background: #fff;

  &:not(:last-child) {
    margin-right: 8px;
  }

  svg {
    position: absolute;
    left: 3px;
  }
`

const StyledInput = styled.input`
  height: 44px;
  width: 100%;
  background: transparent;
  font-size: 32px;
  color: ${p => p.theme.colors.moon};
  border: none;
  caret-color: ${p => p.theme.colors.purple};

  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.15);
    font-weight: 200;
  }
  ::placeholder {
    color: rgba(255, 255, 255, 0.15);
    font-weight: 200;
  }
`

const Featured = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 16px;
  padding: 1px 4px;
  border-radius: 2.5px;
  background: ${p => p.theme.colors.gold};
  color: #000;
  font-size: 10px;
  text-align: center;
`

const ExternalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2222 14.2222H1.77778V1.77778H8V0H1.77778C0.791111 0 0 0.8 0 1.77778V14.2222C0 15.2 0.791111 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V8H14.2222V14.2222ZM9.77778 0V1.77778H12.9689L4.23111 10.5156L5.48444 11.7689L14.2222 3.03111V6.22222H16V0H9.77778Z"
      fill="#73737D"
    />
  </svg>
)
