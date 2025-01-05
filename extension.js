const vscode = require('vscode');
const positron = require('positron');
const { makeRFunctionCallExplicit } = require('./src/makeExplicit');
const { fixLint } = require('./src/fixLint');

function activate(context) {
    console.log(positron);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'formalist.makeRFunctionCallExplicit', makeRFunctionCallExplicit
        ),
        vscode.commands.registerCommand(
            'formalist.fixLint', fixLint
        )
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}; 