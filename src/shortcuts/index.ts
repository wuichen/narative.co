import { navigate } from 'gatsby'

import { shortcutMatchesShortcut, eventToShortcut } from './utils'
import shortcuts from './shortcuts'
import { Feature } from './types'

export default function initShortcuts() {
  const api = {
    // Getting and setting shortcuts
    getShortcutKeys() {
      return shortcuts
    },

    // Listening to shortcut events
    handleKeydownEvent(event: KeyboardEvent) {
      const shortcut = eventToShortcut(event)

      const matchedFeature = shortcuts.find((feature: Feature) => {
        return shortcutMatchesShortcut(shortcut, feature.keys)
      })

      if (matchedFeature) {
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
        case 'ESCAPE': {
          console.log('fired')
          break
        }
        case 'GO_TO_CAREERS': {
          console.log('fired')
          navigate('/careers')
          break
        }
        case 'GO_TO_LABS': {
          console.log('fired')
          navigate('/labs')
          break
        }
        case 'GO_TO_ARTICLES': {
          console.log('fired')
          navigate('/articles')
          break
        }
        case 'CONTACT_US': {
          console.log('fired')
          break
        }
        case 'ESCAPE': {
          console.log('fired')
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
