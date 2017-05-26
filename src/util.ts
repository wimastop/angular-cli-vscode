import * as path from 'path';
import * as fs from 'fs';
/**
 * 获取当前选中菜单的目录
 */
export function getFolderPath(args): string {
  const fsPath = args.fsPath;
  return fs.lstatSync(fsPath).isDirectory() ? fsPath : path.dirname(fsPath);
}