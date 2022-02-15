export * from './clean';
export * from './pack';
export * from './rinit';
export * from './isUpToDate';
import { exec } from 'child_process';
import { exec as exec2 } from 'shelljs';
import { clean } from './clean';
import { isUpToDate } from './isUpToDate';
import { pack } from './pack';
import { rinit } from './rinit';

type Props = {
  currentBranch?: string;
  productionBranch?: string;
  lib?: string;
};

export default function publish({
  currentBranch = 'dev',
  productionBranch = 'main',
  lib = 'lib',
}: Props) {
  const COMMANDS = {
    CHECKOUT_MAIN: `git checkout ${productionBranch}`,
    MERGE: `git merge ${currentBranch}`,
    INSTALL: 'pnpm install --no-frozen-lockfile',
    PUBLISH: 'pnpm run p-publish',
    GIT_CLEAN: 'git clean -fd && git checkout -- .',
  };
  // TODO: Add verif for git status
  if (isUpToDate()) {
    rinit();
    exec(COMMANDS.INSTALL);
    exec2(COMMANDS.CHECKOUT_MAIN);
    exec2(COMMANDS.MERGE);
    pack(lib);
    exec2(COMMANDS.INSTALL);
    exec2(COMMANDS.PUBLISH);
    exec2(COMMANDS.GIT_CLEAN);
    exec2(COMMANDS.INSTALL);
    clean(currentBranch, productionBranch);
    exec2(COMMANDS.INSTALL);
  }
}

publish({ currentBranch: 'dev', productionBranch: 'main' });
