'use strict';
import * as vscode from 'vscode';
import { Generate, GenerateQuickPickItems } from './generate';
import { getFolderPath } from './util';

export function activate(context: vscode.ExtensionContext) {
	
	// 自动化生成代码工具
	GenerateQuickPickItems.forEach(item => {
		const ngGenerate = vscode.commands.registerCommand(`extension.${item.label}`, (args) => {
			// 选择自动生成的类型 component, service...
			Generate.showFileNameDialog({
				cwd: getFolderPath(args), type: item.label 
				})
				.then(Generate.generateComponent)
				.catch((error) => {
					vscode.window.showErrorMessage(error);
				});
		});
		context.subscriptions.push(ngGenerate);
	})
	
}

export function deactivate() {
}