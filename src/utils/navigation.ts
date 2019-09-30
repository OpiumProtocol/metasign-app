import { Navigation } from 'react-native-navigation'

// Constants
import * as Screens from '../constants/screenIds'
import { translate } from '../constants/i18n'
import { IHistoryData } from '../stores/history/models/HistoryData'
import {colors} from "../constants/colors";
import {TOPBAR_LOGO, TOPBAR_MENU} from "../constants/screenIds";

export const goToFirstScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: Screens.SCREEN_FIRST,
            options: {
              topBar: {
                background: {
                  color: colors.light.blue,
                  translucent: false,
                },
                noBorder: true,
                visible: false,
              }
            }
          },
        }]
      }
    }
  })
}

export const goToNewUser = (componentId: string) => {
  Navigation.push(componentId, {
    component: {
      name: Screens.SCREEN_NEW_USER,
      options: {
        topBar: {
            background: {
                color: colors.light.pageContentBackground,
                translucent: false,
            },
            borderColor: colors.light.pageContentBorder,
          title: {
            text: translate('NewUser.title'),
          },
          backButton: {
            title: translate('general.back')
          }
        }
      }
    }
  })
}

export const goToExistingUser = (componentId: string) => {
  Navigation.push(componentId, {
    component: {
      name: Screens.SCREEN_EXISTING_USER,
      options: {
        topBar: {
            background: {
                color: colors.light.pageContentBackground,
                translucent: false,
            },
            borderColor: colors.light.pageContentBorder,
          title: {
            text: translate('ExistingUser.title'),
          },
          backButton: {
            title: translate('general.back')
          }
        }
      }
    }
  })
}

export const goToHistory = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: Screens.SCREEN_HISTORY,
            options: {
              topBar: {
                background: {
                  color: colors.light.blue,
                  translucent: false
                },
                leftButtons: [
                  {
                    id: 'logo',
                    component: {
                      name: TOPBAR_LOGO
                    },
                  }
                ],
                rightButtons: [
                  {
                    id: 'menuButton',
                    component: {
                      name: TOPBAR_MENU,
                    },
                  }
                ]
              }
            }
          },
        }]
      }
    }
  })
}

export const goToScan = (componentId: string) => {
  Navigation.push(componentId, {
    component: {
      name: Screens.SCREEN_SCAN,
      options: {
        topBar: {
          background: {
            color: colors.light.blue,
            translucent: false
          },
          title: {
            text: translate('Scan.title'),
            color: colors.default.white,
          },
          backButton: {
            title: translate('general.back'),
            color: colors.default.white,
          }
        }
      }
    }
  })
}

export const goToConfirmation = (componentId: string, data: IHistoryData) => {
  Navigation.push(componentId, {
    component: {
      name: Screens.SCREEN_CONFIRMATION,
      passProps: {
        data
      },
      options: {
        topBar: {
          background: {
            color: colors.light.blue,
            translucent: false
          },
          title: {
            text: translate('Confirmation.title'),
            color: colors.default.white,
          },
          backButton: {
            title: translate('general.back'),
            color: colors.default.white,
          }
        }
      }
    }
  })
}

export const goToInfo = (componentId: string) => {
  Navigation.push(componentId, {
    component: {
      name: Screens.SCREEN_INFO,
      options: {
        topBar: {
          background: {
            color: colors.light.blue,
            translucent: false
          },
          title: {
            text: translate('Info.title'),
            color: colors.default.white,
          },
          backButton: {
            title: translate('general.back'),
            color: colors.default.white,
          }
        }
      }
    }
  })
}
