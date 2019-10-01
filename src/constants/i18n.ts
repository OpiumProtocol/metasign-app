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
      description: "Tap here to open camera and  scan the QR code on your screen.",
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
      deregisterAccount: "Deregister account",
      deregisterAccountDesc: "Removes your data from the app",
      info: "More info",
    },
    Info: {
      title: "More info",
      description: 'This is what you need to know about metasign, and something more:',
      section1: "More info",
      content1: "MetaSign can be used to authorize transactions with your Ethereum account and sign a variety of requests. It allows dapps to act on behalf of their users in a secure way. Also users don’t need to hold ETH to pay for their gas or even set up an account.\nFor the best user experience using MetaSign, read the guidlines below.\n\n1.Check wether the browser is using a secure connection (closed lock) and the certificate shown in the browser is valid and has been issued to a party trusted by you.\n2. Keep your phone nearby, the QR-code can be valid for a limited amount of time.\n3. Reflections in your PC screen can make scanning more difficult.\n4. Please make sure your mouse pointer does not cover parts of the QR-code.\n5. Fit the QR within the brackets of your in-app camera view by moving away or towards the screen.\n6. When you have confirmed your request via this app, the webpage will automatically process your request.\n7. When a time-out occurs, press the QR refresh button on the webpage, you can keep your mobile app active.\n8. Please remember to close this app after you used ",
      section2: "How Meta-Transactions work",
      content2: "What are meta-transactions\n\nAn easy and secure way to use a blockchain. \nMeta transactions allow apps to abstract away seed phrases and wallet downloads at first. Users can simply use an app and the idea of gas is abstracted away. Native meta transactions let users give orders directly to smart contracts with signed messages. For instance, you could transfer a token that you own to a friend without ever having any ETH to pay for gas.\nEasy comparison is writing a bank check with your signature and let somebody else go to the bank to execute it. Bank will only check your signature and possible instructions that are written on the check, for example \“valid only after 1st of November 2019\"",
      section3: "Contact us",
      content3: "Opium.team consist of professional financial traders, developers and world class mathematicians. Our ambition is to change financial sector for the best. Thanks for the technology it become possible with blockchain. \nWe are focusing on decentralised financial products, derivatives, security and user experience. \nContact us and hi@opium.team\n",
    },
    Disclaimer: {
      title: "IMPORTANT!",
      cancel: "Cancel",
      accept: "Deregister",
      message: "\n\nBefore you deregister make sure you remember your 6 phrase.\n\nIn case you loose this phrase you loose access to your account, all your transactions and assets.",
    },
    Scan: {
      title: "Scan QR",
      description: "Scan the QR code.",
      info: "more info",
    },
  },
};
