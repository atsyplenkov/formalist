const vscode = require('vscode');
const positron = require('positron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { randomUUID } = require('crypto');
const { checkR } = require('./checkR');

async function makeRFunctionCallExplicit() {
    // Check if R is installed and offer to install it if not
    await checkR();

    const config = vscode.workspace.getConfiguration('formalist');
    const ignoredPackages = config.get('ignoredPackages', []);
    const usePackagesExpr = ignoredPackages.length > 0
        ? `setdiff(pedant::current_packages(), c(${ignoredPackages.map(p => `"${p}"`).join(', ')}))`
        : 'pedant::current_packages()';
    const ignoredFunctions = config.get('ignoredFunctions', []);
    const ignoreFunctionsExpr = ignoredFunctions.length > 0
        ? `, ignore_functions = c(${ignoredFunctions.map(f => `"${f}"`).join(', ')})`
        : '';

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active editor found!");
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage("No text selected!");
        return;
    }

    // Create a temporary file path
    const tempdir = os.tmpdir();
    const fileToFormalise = 'formalist-' + randomUUID() + '.R';
    const formalistPath = path.join(tempdir, fileToFormalise).replace(/\\/g, '/');

    try {
        // Write the text to the temporary file
        fs.writeFileSync(formalistPath, text);
        console.log(`Wrote text to ${formalistPath}`);

        // Send the R command to the Positron Console
        const rTemplatePath = path.join(__dirname, 'makeExplicit.R');
        const rTemplate = fs.readFileSync(rTemplatePath, 'utf-8');
        const rCommand = rTemplate
            .replace(/{{FORMALIST_PATH}}/g, formalistPath)
            .replace('{{USE_PACKAGES_EXPR}}', usePackagesExpr)
            .replace('{{IGNORE_FUNCTIONS_EXPR}}', ignoreFunctionsExpr);
        await positron.runtime.executeCode(
            'r', rCommand, false, false,
            positron.RuntimeCodeExecutionMode.Silent
        );

        // Wait and read the output
        await new Promise(resolve => setTimeout(resolve, 100));

        // Read the now formatted file and then delete it
        const formattedSource = fs.readFileSync(formalistPath).toString();
        fs.promises.unlink(formalistPath);

        // Process the formatted source
        if (!formattedSource.startsWith("Error_00")) {
            await editor.edit(editBuilder => {
                editBuilder.replace(selection, formattedSource);
            });
        } else if (formattedSource.startsWith("Error_002")) {
            vscode.window.showErrorMessage("Failed to write selection.");
        } else if (formattedSource.startsWith("Error_001")) {
            vscode.window.showErrorMessage("{pedant} R package is required but not installed.");
        }

    } catch (error) {
        console.error("Full error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Fail: ${errorMessage}`);
    }
}

module.exports = { makeRFunctionCallExplicit }; 