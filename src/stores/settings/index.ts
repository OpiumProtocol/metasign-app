import { types as t, Instance } from 'mobx-state-tree'
import i18n from 'i18n-js'

import { Theme } from '../../constants/colors'
import { Language, translations, translate } from '../../constants/i18n'

i18n.translations = translations

const Settings = t
  .model('Settings', {
    theme: t.enumeration<Theme>('Theme', Object.values(Theme)),
    language: t.enumeration<Language>('Language', Object.values(Language)),
  })
  .actions(self => ({
    afterCreate() {
      // Language settings
      // clear translation cache
      translate.cache.clear()

      // set i18n-js config
      i18n.locale = self.language
    }
  }))

export default Settings

export interface ISettingsStore extends Instance<typeof Settings> {}
