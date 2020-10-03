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

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import queryString from 'query-string';
import { isString } from 'lodash';

import api from './api';
import molfile from './chem/molfile';
import smiles from './chem/smiles';
import * as structformat from './ui/data/convert/structformat';

import ui from './ui';
import Render from './render';

export default class Ketcher {
    constructor({ apiPath }) {
        this.apiPath = apiPath;
        this.server = api(apiPath, {
            'smart-layout': true,
            'ignore-stereochemistry-errors': true,
            'mass-skip-error-on-pseudoatoms': false,
            'gross-formula-add-rsites': true
        });
        this.ui = ui(Object.assign({}, params, buildInfo), this.server);
        this.editor = global._ui_editor;
    }

    version = '__VERSION__';
 	buildDate = '__BUILD_DATE__';
	buildNumber = '__BUILD_NUMBER__' || null;

    getSmiles = () => smiles.stringify(this.editor.struct(), { ignoreErrors: true });
    saveSmiles = () => {
        const struct = this.editor.struct();
        return structformat
            .toString(struct, 'smiles-ext', this.server)
            .catch(() => smiles.stringify(struct));
    }

    getMolfile = () => molfile.stringify(this.editor.struct(), { ignoreErrors: true });
    setMolecule = (molString) => {
        if (!isString(molString))
            return;
        this.ui.load(molString, { rescale: true });
    }

    addFragment = (molString) => {
        if (!isString(molString))
            return;
        this.ui.load(molString, {
            rescale: true,
            fragment: true
        });
    }

    showMolfile = (clientArea, molString, options) => {
        const render = new Render(clientArea, Object.assign({
            scale: options.bondLength || 75
        }, options));
        if (molString) {
            const mol = molfile.parse(molString);
            render.setMolecule(mol);
        }
        render.update();
        // not sure we need to expose guts
        return render;
    }
}
