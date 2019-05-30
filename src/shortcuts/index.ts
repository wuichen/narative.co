import { navigate } from 'gatsby'

import { shortcutMatchesShortcut, eventToShortcut } from './utils'
import shortcuts from './shortcuts'
import * as constants from './constants'
import { Feature } from './types'
import settings from '../settings'

import { store } from '../store'

function initShortcuts(store) {
  const api = {
    // Getting and setting shortcuts
    getShortcutKeys() {
      return shortcuts
    },

    // Listening to shortcut events
    handleKeydownEvent(event: KeyboardEvent) {
      const activeElement = document.activeElement
      const inputs = ['input', 'select', 'button', 'textarea']
      const noInputIsFocused =
        activeElement &&
        inputs.indexOf(activeElement.tagName.toLowerCase()) === -1

      const shortcut = eventToShortcut(event)

      const matchedFeature = shortcuts.find((feature: Feature) => {
        return shortcutMatchesShortcut(shortcut, feature.keys)
      })

      if (
        (matchedFeature && noInputIsFocused) ||
        (matchedFeature && matchedFeature.name === 'ESCAPE')
      ) {
        // Temp logging to make it clear what is matched
        console.log(
          `Pressed ${shortcut.join(' + ')} and matched ${matchedFeature.name}`
        )
        /**
         * If it's a Fey matched feature make sure we don't also invoke a
         * feature the browser or a different tool supports
         */
        event.preventDefault()

        return api.handleShortcutFeature(matchedFeature)
      }

      api.handleBackToDefault(event)
    },

    /**
     * handleShortcutFeature()
     *
     * If a feature is matched, we pass the matched key String so we can
     * act upon it. Here is wher we dispatch and custom action or process we
     * want based on the feature!
     *
     * @param feature String
     */
    handleShortcutFeature(feature: { name: string }, data?: any) {
      switch (feature.name) {
        // Our different Command Line variants
        case constants.COMMAND_LINE_DEFAULT: {
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.COMMAND_LINE_READ: {
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }

        // Go to page in Narative
        case constants.GO_TO_HOME: {
          navigate('/')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_CAREERS: {
          navigate('/careers')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_LABS: {
          navigate('/labs')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_ARTICLES: {
          navigate('/articles')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_ARTICLE: {
          navigate(`/articles/${feature.path}`)
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }

        // Go to Fey
        case constants.GO_TO_FEY: {
          window.open('https://feyapp.com', '_blank')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }

        // Social
        case constants.GO_TO_TWITTER: {
          window.open(settings.urls.twitter, '_blank')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_LINKEDIN: {
          window.open(settings.urls.linkedin, '_blank')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.GO_TO_INSTAGRAM: {
          window.open(settings.urls.instagram, '_blank')
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }

        // Single key commands
        case constants.CONTACT: {
          store.dispatch({ type: constants.SHORTCUT, payload: feature })
          break
        }
        case constants.ESCAPE: {
          store.dispatch({ type: constants.ESCAPE })
          break
        }

        default:
          console.log(`Found no matching shortcut features for ${feature.name}`)
          break
      }
    },

    handleBackToDefault(event: KeyboardEvent) {
      if (event.key === 'Backspace') {
        const val = document.getElementById('CommandLineInput').value
        if (val === '') {
          return api.handleShortcutFeature({ name: 'COMMAND_LINE_DEFAULT' })
        }
      }
    },
  }

  return api
}

export default initShortcuts(store)
