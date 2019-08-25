import { types as t, Instance } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'

// Models
import Settings from './settings/'
import History from './history/'

// Constants
import { Theme } from '../constants/colors'
import { Language } from '../constants/i18n'
import { SignatureStatus } from '../constants/statuses'

const AppStore = t.
  model('AppStore', {
    settings: t.optional(Settings, {
      theme: Theme.LIGHT,
      language: Language[RNLocalize.getLocales()[0].languageCode],
    }),
    history: t.optional(History, {
      data: []
    })
  })

export default AppStore.create({})

export interface IAppStore extends Instance<typeof AppStore> {}
