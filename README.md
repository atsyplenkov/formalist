<!-- badges: start -->
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/atsyplenkov/formalist?label=Open%20VSX%20downloads&color=c160ef)](https://open-vsx.org/extension/atsyplenkov/formalist) [![Deploy Extension](https://github.com/atsyplenkov/formalist/actions/workflows/publish-extensions.yml/badge.svg)](https://github.com/atsyplenkov/formalist/actions/workflows/publish-extensions.yml) ![GitHub License](https://img.shields.io/github/license/atsyplenkov/formalist?color=blue) [![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://img.shields.io/badge/repo_status-WIP-yellow)](https://www.repostatus.org/#wip)
<!-- badges: end -->

# Formalist — Positron Extension

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

Another key feature of `Formalist` is its ability to detect and correct lints in your R code. The linting process is performed locally using the [`{flint}`](https://github.com/etiennebacher/flint) package, which must be installed in your R environment. If the package is not installed, Formalist will prompt you to install it.

![](https://github.com/atsyplenkov/formalist/raw/master/assets/formalist_flint.gif)

> [!TIP]
> The `{flint}` R package installs in your current environment, so, you can setup your custom lint rules by running `flint::setup_flint()` in your R console (read more [here](https://flint.etiennebacher.com/articles/adding_rules)).

# Installation

The extension is published on the [Open VSX Registry](https://open-vsx.org/extension/atsyplenkov/formalist): just click `Install` there or manually install it with:

1) Start the [Positron](https://github.com/posit-dev/positron).

2) Inside Positron, go to the extensions view either by executing the `View: Show Extensions` command (click View -> Command Palette...) or by clicking on the extension icon on the left side of the Positron window.

3) In the extensions view, simply search for the term `Formalist` in the marketplace search box, then select the extension named `Formalist` and click the install button.

Alternatively, you can install the latest version from the [Releases](https://github.com/atsyplenkov/formalist/releases/) page. Download the latest `.vsix` file and install it as described [here](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix).


# Questions and Feature Requests

There's a lot going on with the development of new features in `Formalst`. If you have any questions or something is not working, feel free to [open an issue](https://github.com/atsyplenkov/formalist/issues) or start a conversation on [BlueSky](https://bsky.app/profile/anatolii.nz).


# Contributions

Contributions are welcome! If you'd like to contribute, please, fork, submit a PR and I'll merge it.