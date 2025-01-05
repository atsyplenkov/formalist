const positron = require('positron');
const os = require('os');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

async function checkR() {
    // Create a temporary file path
    const id = randomUUID();
    const tempFilePath = path.join(os.tmpdir(), `pedant_${id}.txt`);
    const normalizedPath = tempFilePath.replace(/\\/g, "/");

    // Prepare the R commands
    const r_check_command = `writeLines(as.character(c(nchar(system.file(package = "pedant")) != 0, nchar(system.file(package = "remotes")) != 0, nchar(system.file(package = "pak")) != 0)), con = '${normalizedPath}')`;
    const pak_install_command = 'pak::pak("wurli/pedant")';
    const remotes_install_command = 'remotes::install_github("wurli/pedant")';
    const install_pak_package = 'install.packages("pak")';

    // Run R commands
    await positron.runtime.executeCode(
        'r', r_check_command, false, false,
        positron.RuntimeCodeExecutionMode.Silent
    );
    // Write results to a tempfile
    console.log(`Wrote results to ${tempFilePath}`);

    // Wait and read the output
    await new Promise(resolve => setTimeout(resolve, 100));

    // Read the output from the temporary file
    const output = await fs.readFile(tempFilePath, { encoding: 'utf8' });
    const pedant = output.split('\n')[0];
    const remotes = output.split('\n')[1];
    const pak = output.split('\n')[2];
    console.log('Pedant is installed? -- ' + pedant);

    if (pedant.includes('FALSE')) {
        // Offer to install pedant
        const install_pedant = await positron.window.showSimpleModalDialogPrompt(
            'Formalist extension is missing {pedant} R package',
            '{pedant} R package is required. Do you want to install {pedant}?',
            'Yes',
            'No'
        );

        if (install_pedant && pak.includes('TRUE')) {
            await positron.runtime.executeCode(
                'r', pak_install_command, false, false
            );
        } else if (install_pedant && remotes.includes('TRUE')) {
            await positron.runtime.executeCode(
                'r', remotes_install_command, false, false
            );
        }
    } else if (pedant.includes('FALSE') && remotes.includes('FALSE') && pak.includes('FALSE')) {
        // Offer to install pedant
        const install_pak = await positron.window.showSimpleModalDialogPrompt(
            'Formalist extension is missing {pedant} R package',
            '{pedant} R package is required. However, it cannot be installed as {pak} or {remotes} packages are missing too. Do you want to install {pak} and {pedant}?',
            'Yes',
            'No'
        );

        if (install_pak) {
            await positron.runtime.executeCode(
                'r', install_pak_package, false, false
            );
            await positron.runtime.executeCode(
                'r', pak_install_command, false, false
            );
        }
    }

    // Delete the temporary file
    await fs.unlink(tempFilePath);
}

async function checkFlint() {
    // Create a temporary file path
    const id = randomUUID();
    const tempFilePath = path.join(os.tmpdir(), `flint_${id}.txt`);
    const normalizedPath = tempFilePath.replace(/\\/g, "/");

    // Prepare the R commands
    const r_check_command = `writeLines(as.character(nchar(system.file(package = "flint")) != 0), con = '${normalizedPath}')`;
    const flint_install_command = 'install.packages("flint", repos = c("https://etiennebacher.r-universe.dev", "https://cloud.r-project.org"))';

    // Run R commands
    await positron.runtime.executeCode(
        'r', r_check_command, false, false,
        positron.RuntimeCodeExecutionMode.Silent
    );
    // Write results to a tempfile
    console.log(`Wrote results to ${tempFilePath}`);

    // Wait and read the output
    await new Promise(resolve => setTimeout(resolve, 100));

    // Read the output from the temporary file
    const output = await fs.readFile(tempFilePath, { encoding: 'utf8' });
    const flint = output.split('\n')[0];
    console.log('Flint is installed? -- ' + flint);

    if (flint.includes('FALSE')) {
        // Offer to install flint
        const install_flint = await positron.window.showSimpleModalDialogPrompt(
            'Formalist extension is missing {flint} R package',
            '{flint} R package is required. Do you want to install {flint}?',
            'Yes',
            'No'
        );

        if (install_flint) {
            await positron.runtime.executeCode(
                'r', flint_install_command, false, false
            );
        }
    }

    // Delete the temporary file
    await fs.unlink(tempFilePath);
}

module.exports = { checkR, checkFlint }; 