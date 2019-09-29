import { AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { persist } from 'mst-persist'

// Views
import App from './views/First'
import NewUser from './views/NewUser'
import ExistingUser from './views/ExistingUser'
import History from './views/History'
import Scan from './views/Scan'
import Confirmation from './views/Confirmation'

// Constants
import * as Screens from './constants/screenIds'

// Store
import store from './stores'

// Utils
import { screenWrapper } from './utils/screens'
import { goToFirstScreen, goToHistory } from './utils/navigation'
import engine from './utils/engine/'
import TopBarLogo from "./components/TopBarLogo";
import MenuButton from "./components/MenuButton";


const registerScreens = () => {
  Navigation.registerComponent(Screens.TOPBAR_MENU, () => MenuButton);
  Navigation.registerComponent(Screens.TOPBAR_LOGO, () => TopBarLogo);
  Navigation.registerComponent(Screens.SCREEN_FIRST, () => screenWrapper(App, store), () => App)
  Navigation.registerComponent(Screens.SCREEN_NEW_USER, () => screenWrapper(NewUser, store), () => NewUser)
  Navigation.registerComponent(Screens.SCREEN_EXISTING_USER, () => screenWrapper(ExistingUser, store), () => ExistingUser)
  Navigation.registerComponent(Screens.SCREEN_HISTORY, () => screenWrapper(History, store), () => History)
  Navigation.registerComponent(Screens.SCREEN_SCAN, () => screenWrapper(Scan, store), () => Scan)
  Navigation.registerComponent(Screens.SCREEN_CONFIRMATION, () => screenWrapper(Confirmation, store), () => Confirmation)
}

Navigation.events().registerAppLaunchedListener(async () => {
  // ********** STORAGE PERSISTANCE AND LOGIC **********
  // Register persistent storage
  // await AsyncStorage.clear()
  await persist('@AppStore', store, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: [
      'settings',
      'history',
      'engine'
    ]
  })

  // Hydrated, initialize Engine from state
  let engineInitialized = false
  engine.init(store.engine)

  if (engine.controller) {
    engine.controller.subscribe(() => {
      if (!engineInitialized) {
        store.engine.setStore(engine.state)
        engineInitialized = true
      }
    })
    engine.controller.context.KeyringController.subscribe(() => {
      store.engine.setController('KeyringController', engine.state.KeyringController)
    })
  }

  // ********** REGISTER SCREENS **********
  registerScreens()

  // ********** REDIRECT LOGIC **********
  if (!store.settings.loggedIn) {
    goToFirstScreen()
  } else {
    // Unlock wallet
    await engine.unlockUser()

    // Go to history
    goToHistory()
  }
})
