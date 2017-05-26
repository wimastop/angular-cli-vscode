import * as path from 'path';
import * as childProcess from 'child_process';
import { window, workspace } from 'vscode';
import { getFolderPath } from './util';

export class Environment {

  static execSync(commands: string, cwd: string) {
    return childProcess.execSync(commands, { cwd: cwd }).toString().trim();
  }

}