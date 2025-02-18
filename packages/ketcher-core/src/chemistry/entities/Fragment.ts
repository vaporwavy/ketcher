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
import { Struct } from './Struct'

export enum StereoFlag {
  Mixed = 'Mixed',
  Abs = 'ABS (Chiral)',
  And = 'AND Enantiomer',
  Or = 'OR Enantiomer'
  // todo: custom in the future
}

function calcStereoFlag(
  struct: Struct,
  stereoAids: Array<number>
): string | undefined {
  if (!stereoAids || stereoAids.length === 0) return undefined
  const atom = struct.atoms.get(stereoAids[0])
  if (!atom) return undefined
  const stereoLabel = atom.stereoLabel // {string | null} "<abs|and|or>-<group>"

  const hasAnotherLabel = stereoAids
    .map(aid => struct.atoms.get(aid))
    .some(atom => atom?.stereoLabel !== stereoLabel)

  return hasAnotherLabel ? StereoFlag.Mixed : stereoLabel?.match(/\D+/g)?.[0]
}

export class Fragment {
  stereoAtoms: Array<number>
  enhancedStereoFlag?: boolean | string

  constructor(flag?: boolean | string) {
    this.stereoAtoms = []
    this.enhancedStereoFlag = flag
  }

  clone(aidMap: Map<number, number>) {
    const fr = new Fragment(this.enhancedStereoFlag)
    fr.stereoAtoms = this.stereoAtoms.map(aid => aidMap.get(aid)!)
    return fr
  }

  updateStereoFlag(struct: any, flag = false) {
    this.enhancedStereoFlag =
      flag !== false ? flag : calcStereoFlag(struct, this.stereoAtoms)
    return this.enhancedStereoFlag
  }

  updateStereoAtom(struct: any, aid: number, isAdd: boolean) {
    if (isAdd && !this.stereoAtoms.includes(aid)) this.stereoAtoms.push(aid)
    if (!isAdd) this.stereoAtoms = this.stereoAtoms.filter(item => item !== aid)

    this.enhancedStereoFlag = calcStereoFlag(struct, this.stereoAtoms)
  }
}
