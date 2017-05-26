'use strict';
import * as vscode from 'vscode';
import { Generate } from './generate';

export function activate(context: vscode.ExtensionContext) {
	// 自动化生成代码工具
	let ngGenerate = vscode.commands.registerCommand('extension.ngGenerate', (args) => {
		// 选择自动生成的类型 component, service...
		Generate.showPickTypeDialog(args)
			.then(Generate.showFileNameDialog)
			.then(Generate.generateComponent)
			.catch((error) => {
				vscode.window.showErrorMessage(error);
			});
	});

	context.subscriptions.push(ngGenerate);
}

export function deactivate() {
}