import { types as t, Instance } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'

// Models
import SettingsStore from './settings/'
import HistoryStore from './history/'
import EngineStore from './engine/'

// Screen models
import NewUserScreenStore from '../views/NewUser/stores/NewUserScreen.store'
import ExistingUserScreenStore from '../views/ExistingUser/stores/ExistingUserScreen.store'

// Constants
import { Theme } from '../constants/colors'
import { Language } from '../constants/i18n'

const AppStore = t.
  model('AppStore', {
    settings: t.optional(SettingsStore, {
      theme: Theme.LIGHT,
      // language: Language[RNLocalize.getLocales()[0].languageCode],
      language: Language.en,
      loggedIn: false
    }),
    history: t.optional(HistoryStore, {
      data: []
    }),
    engine: t.optional(EngineStore, {}),

    // Screen models
    newUserScreen: t.optional(NewUserScreenStore, {}),
    existingUserScreen: t.optional(ExistingUserScreenStore, {}),
  })
  .actions(self => ({
  }))

export default AppStore.create({})

export interface IAppStore extends Instance<typeof AppStore> {}
