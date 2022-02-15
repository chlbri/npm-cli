export * from './clean';
export * from './isUpToDate';
export * from './pack';
export * from './rinit';
export * from './versionnize';

import child_process from 'child_process';
import shell from 'shelljs';
import util from 'util';
import { clean } from './clean';
import { isUpToDate } from './isUpToDate';
import { pack } from './pack';
import { rinit } from './rinit';
import { VersionProps } from './versionnize';

const exec1 = util.promisify(child_process.exec);

type Props = {
  currentBranch?: string;
  productionBranch?: string;
  lib?: string;
  versionProps?: VersionProps;
};

export default async function publish({
  currentBranch = 'dev',
  productionBranch = 'main',
  lib = 'lib',
  versionProps = { type: 'patch', add: 1 },
}: Props) {
  const COMMANDS = {
    CHECKOUT_MAIN: `git checkout ${productionBranch}`,
    MERGE: `git merge ${currentBranch}`,
    INSTALL: 'pnpm install --no-frozen-lockfile',
    PUBLISH: 'pnpm publish --access public --no-git-checks',
    GIT_CLEAN: 'git clean -fd && git checkout -- .',
  };
  // TODO: Add verif for git status
  if (isUpToDate()) {
    rinit();
    await exec1(COMMANDS.INSTALL);
    shell.exec(COMMANDS.CHECKOUT_MAIN);
    shell.exec(COMMANDS.MERGE);
    pack({ lib, versionProps });
    shell.exec(COMMANDS.INSTALL);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
    shell.exec(
      `export NPM_TOKEN="${process.env.NPM_TOKEN}" && ${COMMANDS.PUBLISH}`,
    );
    shell.exec(COMMANDS.GIT_CLEAN);
    shell.exec(COMMANDS.INSTALL);
    clean(currentBranch, productionBranch);
    shell.exec(COMMANDS.INSTALL);
  }
}

publish({ currentBranch: 'dev', productionBranch: 'master' });
