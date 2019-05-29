/**
 * All Fey shortcuts are defined here. This is the master document
 * that controls what keys are listened for on the keydown event listener
 */

const narativeShortcuts = [
  {
    name: 'OPEN_COMMAND_LINE',
    keys: ['meta', 'K'],
    label: 'Open Command Line',
  },
  {
    name: 'CONTACT',
    keys: ['C'],
    label: 'Contact',
  },
  {
    name: 'GO_TO_HOME',
    keys: ['G', 'H'],
    label: 'Go to Home',
  },
  {
    name: 'GO_TO_CAREERS',
    keys: ['G', 'C'],
    label: 'Go to Careers',
  },
  {
    name: 'GO_TO_LABS',
    keys: ['G', 'L'],
    label: 'Go to Labs',
  },
  {
    name: 'GO_TO_ARTICLES',
    keys: ['G', 'A'],
    label: 'Go to Articles',
  },
  {
    name: 'ESCAPE',
    keys: ['escape'],
    label: 'Close Command Line',
  },
]

export default narativeShortcuts

export const narativeShortcutsList = narativeShortcuts

export const isMacLike = () =>
  navigator && navigator.platform
    ? !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
    : false
export const controlOrMetaSymbol = () => (isMacLike() ? '⌘' : 'ctrl')
export const controlOrMetaKey = () => (isMacLike() ? 'meta' : 'control')
export const optionOrAltSymbol = () => (isMacLike() ? '⌥' : 'alt')

export const keyToSymbol = (key: string): string => {
  if (key === 'alt') {
    return optionOrAltSymbol()
  }
  if (key === 'control') {
    return '⌃'
  }
  if (key === 'meta') {
    return '⌘'
  }
  if (key === 'shift') {
    return '⇧​'
  }
  if (key === 'Enter' || key === 'Backspace' || key === 'Esc') {
    return ''
  }
  if (key === 'escape') {
    return 'Esc'
  }
  if (key === ' ') {
    return 'SPACE'
  }
  if (key === 'ArrowUp') {
    return '↑'
  }
  if (key === 'ArrowDown') {
    return '↓'
  }
  if (key === 'ArrowLeft') {
    return '←'
  }
  if (key === 'ArrowRight') {
    return '→'
  }
  if (key === 'i') {
    return key
  }

  return key.toUpperCase()
}
