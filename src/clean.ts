/* eslint-disable prefer-const */
import { exec } from 'shelljs';
import { GIT_PUSH } from './constants';

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

const CLEAN_COMMAND2 = 'git add . && git commit -am "clean"';

export function clean(currentBranch: string, productionBranch: string) {
  const CLEAN_COMMAND4 = `git checkout ${currentBranch} && git merge ${productionBranch}`;
  const CLEAN_COMMAND6 = `git checkout ${currentBranch}`;
  exec(CLEAN_COMMAND2);
  exec(GIT_PUSH);
  exec(CLEAN_COMMAND4);
  exec(GIT_PUSH);
  exec(CLEAN_COMMAND6);
}
