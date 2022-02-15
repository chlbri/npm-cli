export * from './clean';
export * from './pack';
export * from './rinit';
export * from './isUpToDate';
import { exec } from 'child_process';
import util from 'util';
import shell from 'shelljs';
import { clean } from './clean';
import { isUpToDate } from './isUpToDate';
import { pack } from './pack';
import { rinit } from './rinit';

const exec1 = util.promisify(exec);

type Props = {
  currentBranch?: string;
  productionBranch?: string;
  lib?: string;
};

export default async function publish({
  currentBranch = 'dev',
  productionBranch = 'main',
  lib = 'lib',
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
    pack(lib);
    shell.exec(COMMANDS.INSTALL);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
    console.log('\n\nNPM_TOKEN', '===>', process.env.NPM_TOKEN);
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
