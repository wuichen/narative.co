/**
 * All Fey shortcuts are defined here. This is the master document
 * that controls what keys are listened for on the keydown event listener
 */

const feyShortcuts = [
  {
    name: 'OPEN_COMMAND_LINE',
    keys: ['meta', 'K'],
    label: 'Open Command Line',
  },
  {
    name: 'GO_TO_HOME',
    keys: ['H'],
    label: 'Go to Home',
  },
  {
    name: 'GO_TO_CAREERS',
    keys: ['C'],
    label: 'Go to Careers',
  },
  {
    name: 'GO_TO_LABS',
    keys: ['L'],
    label: 'Go to Labs',
  },
  {
    name: 'GO_TO_ARTICLES',
    keys: ['A'],
    label: 'Go to Articles',
  },
  {
    name: 'CONTACT',
    keys: ['X'],
    label: 'Contact',
  },
  {
    name: 'ESCAPE',
    keys: ['escape'],
    label: 'Close Command Line',
  },
]

export default feyShortcuts

export const feyShortcutsList = feyShortcuts

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
