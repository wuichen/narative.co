import {
  GoToIcon,
  MailIcon,
  LightbulbIcon,
  SlashIcon,
  FeyIcon,
  LaptopIcon,
  BookIcon,
} from '../icons/ui'

/**
 * All Fey shortcuts are defined here. This is the master document
 * that controls what keys are listened for on the keydown event listener
 */

const narativeShortcuts = [
  {
    name: 'COMMAND_LINE_DEFAULT',
    keys: ['meta', 'K'],
    label: ['Open ', 'Command Line'],
    icon: GoToIcon,
  },
  {
    name: 'CONTACT',
    keys: ['C'],
    label: ['', 'Contact us'],
    icon: MailIcon,
  },
  {
    name: 'COMMAND_LINE_READ',
    keys: ['shift', 'A'],
    label: ['Read', 'Articles'],
    icon: BookIcon,
  },
  {
    name: 'GO_TO_HOME',
    keys: ['G', 'H'],
    label: ['Go to ', 'Home'],
    icon: SlashIcon,
  },
  {
    name: 'GO_TO_CAREERS',
    keys: ['G', 'C'],
    label: ['Go to ', 'Careers'],
    icon: LightbulbIcon,
  },
  {
    name: 'GO_TO_LABS',
    keys: ['G', 'L'],
    label: ['Go to', ' Labs'],
    icon: LaptopIcon,
  },
  {
    name: 'GO_TO_ARTICLES',
    keys: ['G', 'A'],
    label: ['Go to ', 'Articles'],
    icon: BookIcon,
  },
  {
    name: 'GO_TO_FEY',
    keys: ['G', 'F'],
    label: ['Go to ', ' Fey'],
    icon: FeyIcon,
  },
  {
    name: 'ESCAPE',
    keys: ['escape'],
    label: ['Close ', 'Command Line'],
    icon: GoToIcon,
  },
]

export default narativeShortcuts

export const narativeShortcutsList = narativeShortcuts.filter(
  shortcut => shortcut.name !== 'COMMAND_LINE_DEFAULT'
)

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
