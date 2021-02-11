/****************************************************************************
 * Copyright 2021 EPAM Systems
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
import React from 'react'
import { basicAtoms } from '../../../action/atoms'
import {
  ToolbarGroupItem,
  ToolbarGroupItemCallProps,
  ToolbarGroupItemProps
} from '../ToolbarGroupItem'
import { AtomsList } from './AtomsList'

interface RightToolbarProps
  extends Omit<
    ToolbarGroupItemProps,
    'id' | 'options' | 'Component' | 'tool'
  > {}

interface RightToolbarCallProps extends ToolbarGroupItemCallProps {}

type Props = RightToolbarProps & RightToolbarCallProps

const RightToolbar = (props: Props) => {
  return (
    <div className="toolbar toolbar-right">
      <div className="toolbar-group">
        <ToolbarGroupItem
          id="atom"
          Component={props => AtomsList({ ...props, atoms: basicAtoms })}
          {...props}
        />

        <ToolbarGroupItem
          id="freq-atoms"
          Component={props =>
            AtomsList({ ...props, atoms: props['freqAtoms'] })
          }
          {...props}
        />
      </div>

      <div className="toolbar-group zoom">
        <ToolbarGroupItem id="period-table" {...props} />
      </div>
    </div>
  )
}

export type { RightToolbarProps, RightToolbarCallProps }
export { RightToolbar }
