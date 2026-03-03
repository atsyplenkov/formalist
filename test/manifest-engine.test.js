const assert = require('assert');
const manifest = require('../package.json');

assert.notStrictEqual(
	manifest.engines.vscode,
	'1.106.0',
	'engines.vscode must be a semver range, not an exact version'
);

assert.match(
	manifest.engines.vscode,
	/^[\^>~]/,
	'engines.vscode should use a range operator such as ^, >=, or ~'
);
