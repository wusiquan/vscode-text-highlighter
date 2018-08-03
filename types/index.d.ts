import * as vscode from 'vscode'

export interface IMergeStyle {
  text: string,
  color: string,
  backgroundColor: string,
  overviewRulerColor: string,
  overviewRulerLane?: vscode.OverviewRulerLane
  [index: string]: any
}

export interface IMatches {
  // 这里应该keyof...
  [k: string]: vscode.DecorationOptions[]
}