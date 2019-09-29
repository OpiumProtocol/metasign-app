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
      importAccount: 'IMPORT ACCOUNT',
      application: 'Application',
      scan: 'Scan',
      clipboardSuccess: 'copied to clipboard'
    },
    First: {
      welcome: 'Welcome to MetaSign',
      labelNewUser: "Sign your way into quick transactions. Create an account now or  use one that you already have.",
      labelOldUser: "Already have a seed phrase or  private key?",
      iAmNew: "CREATE ACCOUNT",
      copyright: "Built by Opium.team",
    },
    NewUser: {
      title: "Create account",
      welcome: "You’re almost there...",
      savedThePhrase: 'I SAVED THE PHRASE',
      text1: 'Please write down and save this seed phrase as you will need it to log into your account.',
      text2: 'In case you loose this phrase you loose access to your account, all your transactions and assets.',
      important: "IMPORTANT!"
    },
    ExistingUser: {
      title: "Import account",
      welcome: 'You’re almost there...',
      text1: 'Paste your seed phrase or private key here to import your account in the application',
      placeholder: 'Enter your seed phrase here...'
    },
    History: {
      title: 'History',
      date: 'Date',
      status: 'Status',
      confirmed: 'CONFIRMED',
      rejected: 'REJECTED',
      listEmpty: 'The list is empty',
      logout: 'Log out',
      description: "Tap here to open camera and  scan the QR code on your screen."
    },
    Confirmation: {
      title: 'Confirmation',
      advancedData: 'Advanced data',
      description: 'App Description',
      reject: 'REJECT',
      confirm: 'CONFIRM',
      explanation: 'Please sign this\noperation',
    },
    SideMenu: {
      account: "Account",
      closeApp: "Close app",
      closeAppDesc: "Get back in the same account",
      deregisterAccount: "Deregister account",
      deregisterAccountDesc: "Removes your data from the app",
      info: "More info",
    },
  },
};
