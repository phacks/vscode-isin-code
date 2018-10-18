"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import vscode = require("vscode");
import {
  HoverProvider,
  Hover,
  MarkdownString,
  TextDocument,
  Position,
  CancellationToken,
  WorkspaceConfiguration
} from "vscode";
import axios, { AxiosError } from "axios";

import { OpenFIGIAPIResponse } from "./types/OpenFIGIAPIResponseType";
import { OutgoingHttpHeaders } from "http";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("*", new ISINCodeHoverProvider())
  );
}

class ISINCodeHoverProvider implements HoverProvider {
    private isinCodeConfig: WorkspaceConfiguration;

    constructor() {
        this.isinCodeConfig = vscode.workspace.getConfiguration('isin-code');
    }

  public async provideHover(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): Promise<Hover> {
    let wordRange = document.getWordRangeAtPosition(position);
    let word = wordRange ? document.getText(wordRange) : "";
    let isinCodeMatch = word.match(/[A-Z]{2}[A-Z0-9]{9}\d/);

    if (!wordRange || !isinCodeMatch) {
      return Promise.resolve(new Hover(""));
    }

    let headers: OutgoingHttpHeaders = {
        'Content-Type': 'application/json',
    };

    if (this.isinCodeConfig.OpenFIGIAPIKey !== '') {
        headers['X-OPENFIGI-APIKEY'] = this.isinCodeConfig.OpenFIGIAPIKey;
    }
    return axios
      .request({
          'url': 'https://api.openfigi.com/v1/mapping',
          'method': 'POST',
          'data': [ { idType: "ID_ISIN", idValue: isinCodeMatch[0] } ],
          headers
      }
        )
      .then((response: { data: OpenFIGIAPIResponse }) => {
        const firstData = response.data[0];
        const name = firstData.data[0].name;
        const type = firstData.data[0].securityType;
        let hoverTexts: MarkdownString[] = [];
        hoverTexts.push(
          new MarkdownString(`` + `**${name}**\n\n ` + `_${type}_`)
        );
        let hover = new Hover(hoverTexts);
        return hover;
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 429) {
          return new Hover(
            "You made too many requests, wait a minute and try again."
          );
        }
        return new Hover(
          "Error: could not retrieve the name corresponding to that ISIN Code."
        );
      });
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
