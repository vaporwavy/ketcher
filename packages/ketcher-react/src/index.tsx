/****************************************************************************
 * Copyright 2018 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/
import 'element-closest-polyfill'
// import { StructService } from 'ketcher-core'
import React, { useEffect, useRef } from 'react'
// import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import 'regenerator-runtime/runtime'
import 'url-search-params-polyfill'
import 'whatwg-fetch'
// import { SettingsContext } from './contexts'
import './index.less'
import { /*init, */ buildKetcherAsync, Config } from './script'
// import App from './script/ui/App/App.container'
// import createStore, { load } from './script/ui/state'
// import { initKeydownListener } from './script/ui/state/hotkeys'
// import { loadStruct } from './script/ui/state/shared'
// import { initResize } from './script/ui/state/toolbar'

interface EditorProps extends Omit<Config, 'element'> {}

function Editor(props: EditorProps) {
  // const rootElRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    buildKetcherAsync({
      ...props
      // element: rootElRef.current
    })
    // TODO: provide the list of dependencies after implementing unsubscribe function
  }, [])

  return (
    <div
      // ref={rootElRef}
      className="ketcher-root"></div>
  )
}

// function initApp(
//   element: HTMLInputElement | null,
//   staticResourcesUrl: string,
//   options: any,
//   server: StructService,
//   setEditor: (editor: any) => void
// ) {
//   const store = createStore(options, server, setEditor)
//   store.dispatch(initKeydownListener(element))
//   store.dispatch(initResize())
//
//   ReactDOM.render(
//     <Provider store={store}>
//       <SettingsContext.Provider value={{ staticResourcesUrl }}>
//         <App />
//       </SettingsContext.Provider>
//     </Provider>,
//     element
//   )
//
//   return {
//     load: (structStr, opts) => store.dispatch(load(structStr, opts)),
//     loadStruct
//   }
// }

export { Editor }
