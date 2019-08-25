import { types as t, Instance } from 'mobx-state-tree'
import { SignatureStatus } from '../../../constants/statuses'

export const HistoryData = t.model('HistoryData', {
  id: t.string,
  domain: t.string,
  logo: t.string,
  description: t.string,
  hook: t.string,
  data: t.frozen(),
  metadata: t.frozen(),
  
  timestamp: t.number,
  status: t.enumeration<SignatureStatus>('SignatureStatus', Object.values(SignatureStatus))
})

export interface IHistoryData extends Instance<typeof HistoryData> {}
