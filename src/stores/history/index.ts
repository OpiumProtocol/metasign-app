import { types as t, Instance } from 'mobx-state-tree'
import i18n from 'i18n-js'

// Models
import { HistoryData, IHistoryData } from './models/HistoryData'

// Constants
import { Theme } from '../../constants/colors'
import { Language, translations, translate } from '../../constants/i18n'
import { SignatureStatus } from '../../constants/statuses'

i18n.translations = translations

const History = t
  .model('History', {
    data: t.array(HistoryData)
  })
  .actions(self => ({
    addNew(status: SignatureStatus, data: IHistoryData) {
      self.data.unshift({
        ...data,
        timestamp: ~~(Date.now() / 1000),
        status
      })
    }
  }))

export default History

export interface IHistoryStore extends Instance<typeof History> {}
