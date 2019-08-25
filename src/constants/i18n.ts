import memoize from 'lodash.memoize'
import i18n from 'i18n-js'

export enum Language {
  en = 'en'
}

export const translate = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
)

export const translations = {
  en: {
    general: {
      back: 'Back',
      importAccount: 'Import account',
      application: 'Application',
      scan: 'Scan',
    },
    First: {
      welcome: 'Welcome to MetaStamp.IO',
      labelNewUser: "Don't know what to do?",
      labelOldUser: "Already have seed phrase or private key?",
      iAmNew: "I'm newbe",
    },
    NewUser: {
      welcome: "Look at him!\nWe've got a noob here",
      savedThePhrase: 'I have saved the phrase',
      text1: 'We have made everything for you man',
      text2: 'Write down and save this seed phrase under your bed as you will more likely need it in future'
    },
    ExistingUser: {
      welcome: 'You are a good person to work with',
      text1: 'Paste your seed phrase or private key here to import it into an application',
    },
    History: {
      title: 'History',
      date: 'Date',
      status: 'Status',
      confirmed: 'Confirmed',
      rejected: 'Rejected',
      listEmpty: 'The list is empty'
    },
    Confirmation: {
      title: 'Confirmation',
      message: 'Message',
      description: 'Provided description',
      reject: 'REJECT',
      confirm: 'CONFIRM',
    }
  },
}
