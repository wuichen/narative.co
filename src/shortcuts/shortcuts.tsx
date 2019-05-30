import * as icons from '../icons/ui'
import * as constants from './constants'

/**
 * All Fey shortcuts are defined here. This is the master document
 * that controls what keys are listened for on the keydown event listener
 */
const narativeShortcuts = [
  {
    name: constants.COMMAND_LINE_DEFAULT,
    keys: ['meta', 'K'],
    label: ['Open ', 'Command Line'],
    icon: icons.GoToIcon,
  },
  {
    name: constants.CONTACT,
    keys: ['C'],
    label: ['', 'Contact us'],
    icon: icons.MailIcon,
  },
  {
    name: constants.COMMAND_LINE_READ,
    keys: ['shift', 'A'],
    label: ['Read', 'Articles'],
    icon: icons.BookIcon,
  },
  {
    name: constants.GO_TO_CAREERS,
    keys: ['G', 'C'],
    label: ['Go to ', 'Careers'],
    icon: icons.LightbulbIcon,
  },
  {
    name: constants.GO_TO_LABS,
    keys: ['G', 'L'],
    label: ['Go to', ' Labs'],
    icon: icons.LaptopIcon,
  },
  {
    name: constants.GO_TO_HOME,
    keys: ['G', 'H'],
    label: ['Go to ', 'Home'],
    icon: icons.SlashIcon,
  },
  {
    name: constants.GO_TO_ARTICLES,
    keys: ['G', 'A'],
    label: ['Go to ', 'Articles'],
    icon: icons.BookIcon,
  },
  {
    name: constants.GO_TO_FEY,
    keys: [],
    label: ['Go to ', ' Feyapp.com'],
    external: true,
    icon: icons.FeyIcon,
  },
  {
    name: constants.GO_TO_TWITTER,
    keys: [],
    label: ['Go to ', ' Twitter'],
    external: true,
    icon: icons.TwitterIcon,
  },
  {
    name: constants.GO_TO_INSTAGRAM,
    keys: [],
    label: ['Go to ', ' Instagram'],
    external: true,
    icon: icons.InstagramIcon,
  },
  {
    name: constants.GO_TO_LINKEDIN,
    keys: [],
    label: ['Go to ', ' LinkedIn'],
    external: true,
    icon: icons.LinkedInIcon,
  },

  {
    name: constants.ESCAPE,
    keys: ['escape'],
    label: ['Close ', 'Command Line'],
    icon: icons.GoToIcon,
  },
]

export default narativeShortcuts

export const shortcutList = narativeShortcuts.filter(
  shortcut => shortcut.name !== 'COMMAND_LINE_DEFAULT'
)

export const isMacLike = () =>
  navigator && navigator.platform
    ? !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
    : false
export const controlOrMetaSymbol = () => (isMacLike() ? '⌘' : 'ctrl')
export const controlOrMetaKey = () => (isMacLike() ? 'meta' : 'control')
export const optionOrAltSymbol = () => (isMacLike() ? '⌥' : 'alt')

export const keyToSymbol = (key: string) => {
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
    return icons.ShiftIcon
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
