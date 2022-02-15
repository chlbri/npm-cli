import edit from 'edit-json-file';
import { exec } from 'shelljs';

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

const REMOVE_COMMAND = 'rm -rf dist src test lib';
const PACKAGE = './package.json';

function resetToMain(data: any) {
  if (typeof data !== 'string') return '';
  let _data = '';
  if (data.startsWith('dist/')) {
    _data = data.slice(5);
  }
  if (data.startsWith('lib/')) {
    _data = data.slice(4);
  }
  return _data;
}

export function pack(lib: string) {
  const COPY_COMMAND = `cp -R ${lib}/* .`;
  exec(COPY_COMMAND);
  exec(REMOVE_COMMAND);
  const file = edit(PACKAGE);

  // #region my own
  file.unset('devDependencies');
  file.unset('scripts');
  // #endregion

  // #region Config
  const typings = resetToMain(file.get('typings'));
  file.set('typings', typings);
  const _main = resetToMain(file.get('main'));
  file.set('main', _main);
  // #endregion

  file.save();
}
