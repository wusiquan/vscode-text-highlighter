import * as vscode from 'vscode'
// import R from 'ramda'
import { Utils, DEFAULT_KEYWORDS } from './Utils'

// types
import { IMergeStyle, IMatches } from '../types/index'

let commentLineRegex = /^\/\/(\s)?(TODO:)(?:.*?)$/gm
let commentBlockRegex = /\/\*(?:[\s\S]+?)(TODO:)(?:[\s\S]+?)\*\//gm
const keyWordInComment = new RegExp(`(?:${commentLineRegex.source})|(?:${commentBlockRegex.source})`, 'gm')

export default class Decorator {
  config: vscode.WorkspaceConfiguration
  keyWords: any
  decorationTypes: any
  pattern: any

  constructor() {
    let config = this.config = this.getConfig()
    this.initRegexes(config)
    this.initDecorationType(config)
  }

  /*
   * 初始化，获取用户配置
   */
  private getConfig () {
    let config = vscode.workspace.getConfiguration('texthighlighter')

    return config
  }
  
  /**
   * 初始化, 根据配置初始化正则表达式
   */
  private initRegexes(config: vscode.WorkspaceConfiguration) {
    // styleForRegExp = Object.assign({}, Utils.DEFAULT_STYLE, customDefaultStyle, {
    //     overviewRulerLane: vscode.OverviewRulerLane.Right
    // });
    // pattern = keywordsPattern
    
    this.keyWords = DEFAULT_KEYWORDS
  }
  
  // ..
  // 什么鬼
  private initDecorationType(config: vscode.WorkspaceConfiguration) {
    // vscode.window.createTextEditorDecorationType({
      
    // })

    let keyWords = this.keyWords

    this.decorationTypes = Object.keys(keyWords).reduce((decorationTypes, kword) => {
      let mergedStyle = Object.assign({
        overviewRulerLane: vscode.OverviewRulerLane.Right
      }, keyWords[kword])
      
      if (!mergedStyle.overviewRulerColor) {
        // use backgroundColor as the default overviewRulerColor if not specified by the user setting
        mergedStyle.overviewRulerColor = mergedStyle.backgroundColor
      }

      decorationTypes[kword] = vscode.window.createTextEditorDecorationType(mergedStyle)

      return decorationTypes
    }, <IMergeStyle>{})

    this.pattern = new RegExp(Object.keys(keyWords).join('|'), 'g')
  }

  decorate(editor: vscode.TextEditor | undefined) {
    if (!editor) {
      return
    }

    let editorDoc = editor.document

    if (editor && editorDoc) {
      let languageId = editorDoc.languageId

      if (this.config.languageSupport.includes(languageId)) {
        let pattern = this.pattern
        let text = editorDoc.getText()
        // let decoration = new Map()

        let matches: IMatches = {}
        let match

        while(match = pattern.exec(text)) {
          let matchedValue = match[0]
          let startPos = editorDoc.positionAt(match.index)
          let endPos = editorDoc.positionAt(match.index + matchedValue.length)
          let decoration = { range: new vscode.Range(startPos, endPos) }

          if (matches[matchedValue]) {
            matches[matchedValue].push(decoration);
          } else {
            matches[matchedValue] = [decoration];
          }
        }
        
        Object.keys(this.decorationTypes).forEach((kWord) => {
          let rangeOption = matches[kWord]
          let decorationType = this.decorationTypes[kWord]
          editor.setDecorations(decorationType, rangeOption)
        })
      }
    }
  }
}