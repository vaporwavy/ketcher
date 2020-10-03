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
import Ketcher from './ketcher';

// TODO: replace window.onload with something like <https://github.com/ded/domready>
// to start early
window.onload = function () {
	const params = queryString.parse(document.location.search);
	const { mol, api_path = '__API_PATH__' } = params;
	
	const ketcher = new Ketcher({ apiPath: api_path });
	window.ketcher = ketcher

	ketcher.editor = global._ui_editor;
	ketcher.server.then(() => {
		if (mol)
			ketcher.ui.load(mol);
	}, () => {
		document.title += ' (standalone)';
	});
};
