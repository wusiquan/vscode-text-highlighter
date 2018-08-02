import * as vscode from 'vscode'

export default class Decorator {
  config: any

  constructor() {
    this.config = vscode.workspace.getConfiguration('texthighlighter')
  }

  decorate(editor?: vscode.TextEditor) {
    if (!editor) {
      return
    }

    let editorDoc = editor.document

    if (editor && editorDoc) {
      let languageId = editorDoc.languageId

      if (this.config.languageSupport.includes(languageId)) {
        let text = editorDoc.getText()
        let decoration = new Map()

        
      }
    }
  }
}