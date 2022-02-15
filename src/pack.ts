import edit from 'edit-json-file';
import { exec } from 'shelljs';
import { PACKAGE } from './constants';
import { versionnize, VersionProps } from './versionnize';

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

const REMOVE_COMMAND = 'rm -rf dist src test lib';

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

type Props = {
  lib: string;
  versionProps: VersionProps;
};

export function pack({ lib, versionProps }: Props) {
  const COPY_COMMAND = `cp -R ${lib}/* .`;
  exec('tsc');
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

  // #region Versioning
  const _version = file.get('version');
  if (typeof _version === 'string') {
    const version = versionnize(versionProps, _version);
    file.set('version', version);
  }
  // #endregion

  file.save();
}
