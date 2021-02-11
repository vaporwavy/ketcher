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
import clsx from 'clsx'
import React from 'react'

import action, { UiActionAction } from '../../../../action'
import { shortcutStr } from '../../shortcutStr'
import Icon from '../../../../component/view/icon'
import templates from '../../../../data/templates'

interface TemplatesListProps {
  active?: {
    tool?: string
    opts: {
      struct: any
    }
  }
}

interface TemplatesListCallProps {
  onAction: (action: UiActionAction) => void
}

type Props = TemplatesListProps & TemplatesListCallProps

const TemplatesList = (props: Props) => {
  const { active, onAction } = props
  const shortcut = shortcutStr(action['template-0'].shortcut)
  const isTmpl = active && active.tool === 'template'

  return (
    <>
      {templates.map((struct, i) => (
        <div
          key={`template-${i}`}
          id={`template-${i}`}
          className={clsx({
            selected: isTmpl && active && active.opts.struct === struct
          })}>
          <button
            title={`${struct.name} (${shortcut})`}
            onClick={() => {
              onAction({ tool: 'template', opts: { struct } })
            }}>
            <Icon name={`template-${i}`} />
          </button>
        </div>
      ))}
    </>
  )
}

export type { TemplatesListProps, TemplatesListCallProps }
export { TemplatesList }
