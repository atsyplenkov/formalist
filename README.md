<h1 align="center"><code>formalist</code> — a Positron extension</h1>

<p align="center">
    <a href="https://open-vsx.org/extension/atsyplenkov/formalist">
        <img src="https://img.shields.io/open-vsx/dt/atsyplenkov/formalist?style=flat&labelColor=1e2c2e&color=007ACC&logo=Open%20VSX&logoColor=white&label=Open%20VSX%20downloads"></a>
    <a href="https://github.com/atsyplenkov/formalist/actions/workflows/publish-extensions.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/formalist/publish-extensions.yml?style=flat&labelColor=1e2c2e&color=007ACC&logo=GitHub%20Actions&logoColor=white&label=deploy"></a>
    <br>
    <a href="https://github.com/atsyplenkov/formalist/blob/master/LICENSE.md">
        <img src="https://img.shields.io/github/license/atsyplenkov/formalist?style=flat&labelColor=1e2c2e&color=007ACC&logo=GitHub&logoColor=white"></a>
    <a href="https://www.repostatus.org/#wip">
        <img src="https://img.shields.io/badge/repo_status-WIP-ffb200?style=flat&labelColor=1e2c2e&logo=readthedocs&logoColor=white"></a>
</p>

> [!IMPORTANT]
> The extension is designed to work **ONLY** in
> [Positron](https://github.com/posit-dev/positron) IDE starting from version `2025.01.0`, as it heavily depends
> on the Positron API.

# Features

> [!NOTE]
> All features work on selected text. If no text is selected, you'll receive a notification to make a selection first.

## Make R Function Calls Explicit

`Formalist` can make R function calls explicit, instead of implicit ones, using the [`{pedant}`](https://github.com/wurli/pedant) R package. In other words, it checks the currently attached packages, i.e., the ones already loaded using `library()`, and transforms R function calls like `select(mtcars, mpg, cyl)` into `dplyr::select(mtcars, mpg, cyl)`.

![](https://github.com/atsyplenkov/formalist/raw/master/assets/formalist_demo.gif)

## Fix Lints

> [!WARNING]
> **Deprecated:** The `Fix All Lints` feature is deprecated as of v0.3.0 and will be removed in v0.4.0.
> The underlying R package `flir` is no longer actively maintained. We recommend migrating to
> [`jarl`](https://github.com/etiennebacher/jarl), a next-generation R linter written in Rust.
> Learn more at: https://github.com/etiennebacher/jarl

# Configuration

You can configure `Formalist` via the Positron settings (search for `@ext:atsyplenkov.formalist` in Settings).

### `formalist.showContextMenu`

Controls whether Formalist commands appear in the editor's right-click context menu.

### `formalist.ignoredPackages`

A list of R package names that `pedant` will skip when making function calls explicit. Useful for packages you always attach and don't want to qualify. For example, adding `dplyr` means `select(mtcars, mpg)` stays as-is instead of becoming `dplyr::select(mtcars, mpg)`.

### `formalist.ignoredFunctions`

A list of R function names that `pedant` will leave unchanged, regardless of which package exports them. Useful for specific functions you want to keep implicit even if their package is being made explicit. For example, adding `plot` prevents it from being rewritten as `sf::plot(...)` or `sp::plot(...)`, or `terra::plot(...)`. You got it :)

# Installation

The extension is published on the [Open VSX Registry](https://open-vsx.org/extension/atsyplenkov/formalist): just click `Install` there or manually install it with:

1) Start the [Positron](https://github.com/posit-dev/positron).

2) Inside Positron, go to the extensions view either by executing the `View: Show Extensions` command (click `View` -> `Command Palette...`) or by clicking on the extension icon on the left side of the Positron window.

3) In the extensions view, simply search for the term `Formalist` in the marketplace search box, then select the extension named `Formalist` and click the install button.

Alternatively, you can install the latest version from the [Releases](https://github.com/atsyplenkov/formalist/releases/) page. Download the latest `.vsix` file and install it as described [here](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix).

## Dependencies

`Formalist` depends on the R package [`{pedant}`](https://github.com/wurli/pedant) for making function calls explicit.

> [!WARNING]
> Support for the [`{flir}`](https://github.com/etiennebacher/flir) linting feature has been deprecated.
> The `{flir}` package is no longer actively maintained. Please use [`{jarl}`](https://github.com/etiennebacher/jarl)
> for linting instead — a next-generation R linter written in Rust.
>
> If `{flir}` is missing, you will still be prompted to install it until the feature is removed in v0.4.0.

![](https://github.com/atsyplenkov/formalist/raw/master/assets/formalist_install.gif)

# Questions and Feature Requests

There's a lot going on with the development of new features in `Formalist`. If you have any questions or something is not working, feel free to [open an issue](https://github.com/atsyplenkov/formalist/issues) or start a conversation on [Mastodon](https://fosstodon.org/@atsyplenkov).


# Contributions

Contributions are welcome! If you'd like to contribute, please, fork, submit a PR and I'll merge it.
