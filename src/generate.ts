import * as path from 'path';
import * as childProcess from 'child_process';
import { window, workspace } from 'vscode';
import { getFolderPath } from './util';
import { Environment } from './environment';
import * as Q from 'q';

export interface GenerateOption {
  name?: string;
  cwd?: string;
  type?: string;
}

export const GenerateQuickPickItems = [
  { label: 'component', description: 'ng g component' },
  { label: 'directive', description: 'ng g directive' },
  { label: 'service', description: 'ng g service' },
  { label: 'class', description: 'ng g class' },
  { label: 'interface', description: 'ng g interface' },
  { label: 'module', description: 'ng g module' },
  { label: 'pipe', description: 'ng g pipe' },
  { label: 'guard', description: 'ng g guard' },
  { label: 'enum', description: 'ng g enum' },
];

export class Generate {

  static showPickTypeDialog(args): Q.Promise<GenerateOption> {
    const deferred: Q.Deferred<GenerateOption> = Q.defer<GenerateOption>();
    window.showQuickPick(GenerateQuickPickItems).then((result) => {
      deferred.resolve({ cwd: getFolderPath(args), type: result.label });
    });
    return deferred.promise;
  }

  static showFileNameDialog(args: GenerateOption): Q.Promise<GenerateOption> {
    const deferred: Q.Deferred<GenerateOption> = Q.defer<GenerateOption>();
    window.showInputBox({
      prompt: '请输入你要自动生成的文件名称',
      placeHolder: 'Generate name'
    }).then((fileName) => {
      if (!fileName || /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?\s]/g.test(fileName)) {
        deferred.reject('That\'s not a valid name! (no whitespaces or special characters)');
      } else {
        args.name = fileName;
        deferred.resolve(args);
      }
    }, (error) => { window.showErrorMessage(error); });
    return deferred.promise;
  }

  static generateComponent(option): Q.Promise<GenerateOption> {
    const deferred: Q.Deferred<GenerateOption> = Q.defer<GenerateOption>();
    const result = Environment.execSync(`ng g ${option.type} ${option.name}`, option.cwd);
    window.showInformationMessage(result);
    return deferred.promise;
  }
}
