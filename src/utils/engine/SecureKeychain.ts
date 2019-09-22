import * as Keychain from 'react-native-keychain'

import encryptor from './Encryptor'

class EncryptionHelper {
	code = '';

	constructor(code: string) {
		this.code = code
	}

	encryptPassword(password: string) {
		return encryptor.encrypt(this.code, { password })
	}

	decryptPassword(str: string) {
		return encryptor.decrypt(this.code, str)
	}
}

class SecureKeychain {
  initialized: boolean = false
  helper: EncryptionHelper | undefined
  defaultOptions: object | undefined

  ACCESS_CONTROL = Keychain.ACCESS_CONTROL
  
  init(salt: string) {
    this.helper = new EncryptionHelper(salt)
    this.initialized = true
    this.defaultOptions = {
      service: 'org.metasign.app',
      // authenticationPromptTitle: translate('authentication.auth_prompt_title'),
      // authenticationPrompt: translate('authentication.auth_prompt_desc'),
      // authenticationPromptDesc: translate('authentication.auth_prompt_desc'),
      // fingerprintPromptTitle: translate('authentication.fingerprint_prompt_title'),
      // fingerprintPromptDesc: translate('authentication.fingerprint_prompt_desc'),
      // fingerprintPromptCancel: translate('authentication.fingerprint_prompt_cancel')
    }
  }

  getSupportedBiometryType() {
		return Keychain.getSupportedBiometryType()
  }
  
  async getGenericPassword() {
    if (!this.initialized || !this.helper) {
      throw new Error('Not initialized')
    }

    const keychainObject = await Keychain.getGenericPassword(this.defaultOptions)
    if (keychainObject && keychainObject.password) {
      const encryptedPassword = keychainObject.password
      const decrypted = await this.helper.decryptPassword(encryptedPassword)
      keychainObject.password = decrypted.password
      return keychainObject
    }

    return null
	}

  async setGenericPassword(key: string, password: string, authOptions?: Keychain.Options) {
    if (!this.initialized || !this.helper) {
      throw new Error('Not initialized')
    }

    const encryptedPassword = await this.helper.encryptPassword(password)
		return Keychain.setGenericPassword(key, encryptedPassword, { ...this.defaultOptions, ...authOptions })
  }
}

export default new SecureKeychain()
