import * as vscode from 'vscode'
import { window as vsWindow, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode'
import Decorator from './Decorator'

export function activate(context: ExtensionContext) {
	
	let activeEditor = vsWindow.activeTextEditor

	let decorator = new Decorator()
	console.log('插件activate')

	context.subscriptions.push(
		vsWindow.onDidChangeActiveTextEditor(editor => {
			console.log(111)
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