const vscode = require('vscode');
const positron = require('positron');
const { makeRFunctionCallExplicit } = require('./src/makeExplicit');

function activate(context) {
    console.log(positron);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'formalist.makeRFunctionCallExplicit', makeRFunctionCallExplicit
        )
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}; 