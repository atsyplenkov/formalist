const vscode = require('vscode');
const positron = require('positron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { randomUUID } = require('crypto');
const { checkR, checkFlir } = require('./checkR');

// Error constants
const flir_ERRORS = {
    WRITE_FAILED: 'Error_002',
    PACKAGE_MISSING: 'Error_001'
};

// Utility function for temporary file operations
async function withTempFile(content, operation) {
    const tempdir = os.tmpdir();
    const filename = `flir-${randomUUID()}.R`;
    const filepath = path.join(tempdir, filename).replace(/\\/g, '/');

    try {
        fs.writeFileSync(filepath, content);
        console.log(`Wrote text to ${filepath}`);
        const result = await operation(filepath);
        return result;
    } finally {
        // Cleanup temp file
        fs.promises.unlink(filepath).catch(console.error);
    }
}

// Generate R command
function generateRCommand(filepath) {
    return `
    if (!file.exists('${filepath}')) {
        writeLines('${flir_ERRORS.WRITE_FAILED}', con = '${filepath}')
    } else {
        tryCatch(
            {
                flir::fix('${filepath}')
            },
            error = function(e) {
                writeLines('${flir_ERRORS.PACKAGE_MISSING}', con = '${filepath}')
            },
            silent = TRUE
        )
    }`;
}

async function fixLint() {
    // Check if R is installed and offer to install it if not
    await checkFlir();

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

    try {
        const formattedSource = await withTempFile(text, async (filepath) => {
            await positron.runtime.executeCode(
                'r',
                generateRCommand(filepath),
                false,
                false,
                positron.RuntimeCodeExecutionMode.Silent
            );

            // Wait with timeout
            await Promise.race([
                new Promise(resolve => setTimeout(resolve, 1000)),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('R execution timed out')), 5000)
                )
            ]);

            return fs.readFileSync(filepath).toString();
        });

        // Process the formatted source
        if (!formattedSource.startsWith("Error_")) {
            await editor.edit(editBuilder => {
                editBuilder.replace(selection, formattedSource);
            });
        } else if (formattedSource.startsWith(flir_ERRORS.WRITE_FAILED)) {
            throw new Error("Failed to write selection to temporary file");
        } else if (formattedSource.startsWith(flir_ERRORS.PACKAGE_MISSING)) {
            throw new Error("The {flir} R package is required but not installed");
        }

    } catch (error) {
        console.error("Full error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Formatting failed: ${errorMessage}`);
    }
}

module.exports = { fixLint }; 