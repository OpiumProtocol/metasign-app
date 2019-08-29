import { types as t, Instance } from 'mobx-state-tree'
import { ShapeShiftController } from 'gaba'

const EngineStore = t
  .model('Engine', {
    KeyringController: t.frozen()
  })
  .actions(self => ({
    setStore(values) {
      for (let key in values) {
        self[key] = values[key]
      }
    },

    setController(key: string, values) {
      self[key] = values
    }
  }))

export default EngineStore

export interface IEngineStore extends Instance<typeof EngineStore> {}
