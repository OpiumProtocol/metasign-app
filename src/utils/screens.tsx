import React from 'react'
import { Provider } from 'mobx-react'

export const screenWrapper = (Screen, store) => (props) => (
  <Provider store={store}>
    <Screen {...props} />
  </Provider>
)
