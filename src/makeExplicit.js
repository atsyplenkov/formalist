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
        const rCommand = `
        if (!file.exists('${formalistPath}')) {
        # If file does not exist, write
        # an error message to the path
        writeLines('Error_002', con = '${formalistPath}')
        } else {
        tryCatch(
            {
            # Attempt to read the file, process it,
            # and write the updated content
            content <-
                readLines('${formalistPath}', encoding = 'UTF-8', warn = FALSE) |>
                paste0(collapse = '\\n')
            updated_content <- pedant::add_double_colons(content)
            writeLines(enc2utf8(updated_content), con = '${formalistPath}')
            },
            error = function(e) {
            # If an error occurs during the formating process,
            # write an error message
            writeLines('Error_001', con = '${formalistPath}')
            }
        )
        }
        `;
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