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
import {
  ToolbarGroupItem,
  ToolbarGroupItemCallProps,
  ToolbarGroupItemProps
} from '../ToolbarGroupItem'
import { ZoomList } from './ZoomList'

interface TopToolbarProps
  extends Omit<
    ToolbarGroupItemProps,
    'id' | 'options' | 'Component' | 'tool'
  > {}

interface TopToolbarCallProps extends ToolbarGroupItemCallProps {}

type Props = TopToolbarProps & TopToolbarCallProps

const TopToolbar = (props: Props) => {
  return (
    <div className="toolbar toolbar-top">
      <div className="toolbar-group">
        <ToolbarGroupItem id="new" {...props} />
        <ToolbarGroupItem id="open" {...props} />
        <ToolbarGroupItem id="save" {...props} />
      </div>

      <div className="toolbar-group">
        <ToolbarGroupItem id="undo" {...props} />
        <ToolbarGroupItem id="redo" {...props} />
        <ToolbarGroupItem id="cut" {...props} />
        <ToolbarGroupItem id="copy" {...props} />
        <ToolbarGroupItem id="paste" {...props} />
      </div>

      <div className="toolbar-group zoom">
        <ToolbarGroupItem id="zoom-in" {...props} />
        <ToolbarGroupItem id="zoom-out" {...props} />
        <ToolbarGroupItem id="zoom-list" Component={ZoomList} {...props} />
      </div>

      <div className="toolbar-group">
        <ToolbarGroupItem id="layout" {...props} />
        <ToolbarGroupItem id="clean" {...props} />
        <ToolbarGroupItem id="arom" {...props} />
        <ToolbarGroupItem id="dearom" {...props} />
        <ToolbarGroupItem id="cip" {...props} />
        <ToolbarGroupItem id="check" {...props} />
      </div>

      <div className="toolbar-group">
        <ToolbarGroupItem id="recognize" {...props} />
        <ToolbarGroupItem id="miew" {...props} />
      </div>

      <div className="toolbar-group meta">
        <ToolbarGroupItem id="settings" {...props} />
        <ToolbarGroupItem id="help" {...props} />
        <ToolbarGroupItem id="about" {...props} />
      </div>
    </div>
  )
}

export type { TopToolbarProps, TopToolbarCallProps }
export { TopToolbar }
