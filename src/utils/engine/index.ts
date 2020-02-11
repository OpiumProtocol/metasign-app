import {
  ComposableController,
  PreferencesController,
  KeyringController,
  TypedMessageParams
} from 'gaba'
import { Platform } from 'react-native'

// Stores
import { IEngineStore } from '../../stores/engine'

import encryptor from './Encryptor'
import SecureKeychain from './SecureKeychain'

class Engine {
  controller: ComposableController | undefined
  initialized: boolean = false
  keyring: any
  accounts: string[] = []

  init(initialState: IEngineStore) {
    this.controller = new ComposableController([
      new PreferencesController(),
      new KeyringController({ encryptor }, initialState.KeyringController)
    ])

    SecureKeychain.init()

    this.initialized = true
  }

  async newVault() {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }

    const keyringController = <KeyringController> this.controller.context.KeyringController
    await keyringController.createNewVaultAndKeychain('');
    await SecureKeychain.setGenericPassword('metasign-user', '')
    const mnemonic = await keyringController.exportSeedPhrase('')
    const seed = JSON.stringify(mnemonic).replace(/"/g, '')
    return seed
  }

  async restoreVault(seed: string) {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }

    // FIXME: Make it better in future
    const password = encryptor.randomPassword()
    const keyringController = <KeyringController> this.controller.context.KeyringController
    await keyringController.createNewVaultAndRestore(password, seed)

    const biometryType: string | null = await SecureKeychain.getSupportedBiometryType()

    console.warn('Available biometryType:', biometryType)
    const authOptions = {
      accessControl: biometryType
        ? SecureKeychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE
        : SecureKeychain.ACCESS_CONTROL.DEVICE_PASSCODE
    }

    await SecureKeychain.setGenericPassword('metasign-user', password, authOptions)

    // If the user enables biometrics, we're trying to read the password
    // immediately so we get the permission prompt
    if (Platform.OS === 'ios') {
      console.warn('Getting generic password')
      await SecureKeychain.getGenericPassword()
    }

    this.accounts = await keyringController.getAccounts()
    console.warn(this.accounts)
  }

  async signTypedData(message: TypedMessageParams) {
    const keyringController = this._KeyringController

    return keyringController.signTypedMessage(message, 'V3')
  }

  async unlockUser() {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }

    const { password } = await SecureKeychain.getGenericPassword()

    const keyringController = <KeyringController> this.controller.context.KeyringController
    await keyringController.submitPassword(password)
    this.accounts = await keyringController.getAccounts()
    console.warn(this.accounts)
  }

  get _KeyringController() {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }
    
    const keyringController = <KeyringController> this.controller.context.KeyringController
    return keyringController
  }

  get state() {
    if (!this.initialized || !this.controller) {
      throw new Error('Not initialized yet')
    }
    
    const {
      KeyringController
    } = this.controller.state
    
    return {
      KeyringController
    }
  }
}

export default new Engine()
