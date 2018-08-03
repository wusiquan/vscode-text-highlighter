import * as vscode from 'vscode'
import { window as vsWindow, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode'

import Decorator from './Decorator'

export function activate(context: ExtensionContext) {
	
	let activeEditor = vsWindow.activeTextEditor

	console.log('插件activate')

	let decorator = new Decorator()
	
	context.subscriptions.push(
		vsWindow.onDidChangeActiveTextEditor(editor => {
			decorator.decorate(editor)
		})
	)

	// vscode.workspace.onDidChangeTextDocument(event => {
	// 	if (activeEditor && event.document === activeEditor.document) {
			
	// 	}
	// }, null, context.subscriptions)
}

export function deactivate() {
	console.log('插件deactivate')
}