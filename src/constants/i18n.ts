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
      labelNewUser: "Sign your way into quick transactions. Create an account now or use one that you already have.",
      labelOldUser: "Already have a seed phrase or private key?",
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
      description: "Tap here to open camera and scan the QR code on your screen.",
      today: "Today",
      yesterday: "Yesterday",
      week: "Last week",
      month: "Last month",
      year: "Last year",
      all: "All",
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
      closeApp: "Log out",
      closeAppDesc: "Get back in the same account",
      unregisterAccount: "Unregister account",
      unregisterAccountDesc: "Removes your data from the app",
      info: "More info",
    },
    Info: {
      title: "More info",
      description: 'This is what you need to know about metasign, and something more:',
      section1: "How to scan a QR code?",
      content1: 
`MetaSign can be used to authorize transactions with your Ethereum account and, if available sign a variety of requests.

For the best user experience using MetaSign, read the guidelines below.

1. Check wether the browser is using a secure connection (closed lock) and the certificate shown in the browser is valid and has been issued to a party trusted by you.
2. Keep your phone nearby, the QR-code can be valid for a limited amount of time.
3. Reflections in your PC screen can make scanning more difficult.
4. Please make sure your mouse pointer does not cover parts of the QR-code.
5. Fit the QR within the brackets of your in-app camera view by moving away or towards the screen.
6. When you have confirmed your request via this app, the webpage will automatically process your request.
7. When a time-out occurs, press the QR refresh button on the webpage, you can keep your mobile app active.
8. Please remember to close this app after you used it.`,
      section2: "What are meta-transactions?",
      content2: 
`Using meta-transactions users are given an easy and secure way to interact with the blockchain from accounts that don’t hold any Ether. This is may be necessary to drive mass adoption of Ethereum. Users don’t care about decentralization or private keys; they care about using a Dapp to do something important to them.

Easy comparison is writing a bank check with your signature and let somebody else go to the bank to execute it. The bank will only check your signature and possible instructions that are written on the check, for example “valid only after 1st of November 2019”.`,
      section3: "Contact details",
      content3: 
`MetaSign is created by https://opium.team

Opium team is specialized in building decentralized derivatives.

Opium team
Kruisplein 488a
3012 CC  Rotterdam
The Netherlands

For feedback send an email to: hi@opium.team

Or join us on Telegram: https://t.me/dib.one`,
    },
    Disclaimer: {
      title: "IMPORTANT!",
      cancel: "Cancel",
      accept: "Unregister",
      message: "\n\nBefore you unregister make sure you remember your seed phrase.\n\nIn case you loose this phrase you loose access to your account, all your transactions and assets.",
    },
    Scan: {
      title: "Scan QR",
      description: "Scan the QR code.",
      info: "more info",
    },
  },
};
