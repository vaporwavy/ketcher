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
import { TemplatesList } from './TemplatesList'

interface BottomToolbarProps
  extends Omit<
    ToolbarGroupItemProps,
    'id' | 'options' | 'Component' | 'tool'
  > {}

interface BottomToolbarCallProps extends ToolbarGroupItemCallProps {}

type Props = BottomToolbarProps & BottomToolbarCallProps

const BottomToolbar = (props: Props) => {
  return (
    <div className="toolbar toolbar-bottom">
      <div className="toolbar-group">
        <ToolbarGroupItem
          id="template-common"
          Component={TemplatesList}
          {...props}
        />
      </div>

      <div className="toolbar-group zoom">
        <ToolbarGroupItem id="template-lib" {...props} />

        {/*
          //TODO: it should be enabled after starting work on enhanced stereo
          <ToolbarGroupItem id="enhanced-stereo" {...props} />
        */}
      </div>
    </div>
  )
}

export type { BottomToolbarProps, BottomToolbarCallProps }
export { BottomToolbar }
