import { exec } from 'shelljs';

export function isUpToDate() {
  return exec('git status -s').stdout.length === 0;
}
