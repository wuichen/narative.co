import { navigate } from 'gatsby'

import { shortcutMatchesShortcut, eventToShortcut } from './utils'
import shortcuts from './shortcuts'
import { Feature } from './types'

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

      console.log(noInputIsFocused)
      if (matchedFeature && noInputIsFocused) {
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
        case 'OPEN_COMMAND_LINE': {
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'GO_TO_HOME': {
          navigate('/')
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'GO_TO_CAREERS': {
          navigate('/careers')
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'GO_TO_LABS': {
          navigate('/labs')
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'GO_TO_ARTICLES': {
          navigate('/articles')
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'CONTACT': {
          store.dispatch({ type: 'SHORTCUT', payload: feature })
          break
        }
        case 'ESCAPE': {
          store.dispatch({ type: 'ESCAPE' })
          break
        }

        default:
          console.log(`Found no matching shortcut features for ${feature.name}`)
          break
      }
    },
  }

  return api
}

export default initShortcuts(store)
