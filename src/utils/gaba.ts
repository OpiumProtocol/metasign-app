import {
  ComposableController,
  PreferencesController,
  KeyringController
} from 'gaba'

import Encryptor from './Encryptor'

const encryptor = new Encryptor()

class Gaba {
  controller: ComposableController | undefined
  initialized: boolean = false
  keyring: any

  init() {
    this.controller = new ComposableController([
      new PreferencesController(),
      new KeyringController({ encryptor })
    ])

    this.initialized = true
  }

  async createVault() {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }

    const keyringController = <KeyringController> this.controller.context.KeyringController
    // TODO: implement touch-id and keychain stuff here
    this.keyring = await keyringController.createNewVaultAndKeychain('coolpassword')
  }

  // TODO
  restoreVault() {

  }
}

export default new Gaba()
