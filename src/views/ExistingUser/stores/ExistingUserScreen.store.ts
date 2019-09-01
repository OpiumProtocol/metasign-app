import { types as t, Instance, getRoot } from 'mobx-state-tree'

import engine from '../../../utils/engine/'

const ExistingUserScreenStore = t
  .model('ExistingUserScreen', {
    loading: t.optional(t.boolean, false),
    error: t.optional(t.string, ''),
  })
  .actions(self => ({
    afterCreate() {
    },

    async registerNewSeed(seed: string) {
      this._setError('')
      this._setLoading(true)
      try {
        await engine.restoreVault(seed)
        getRoot(self).settings.setLoggedIn(true)
      } catch (e) {
        this._setError(e.message)
      }
      this._setLoading(false)

      if (!!self.error.length) {
        throw new Error(self.error)
      }
    },

    // Private methods
    _setLoading(loading: boolean) {
      self.loading = loading
    },

    _setError(error: string) {
      self.error = error
    },
  }))

export default ExistingUserScreenStore

export interface IExistingUserScreenStore extends Instance<typeof ExistingUserScreenStore> {}
