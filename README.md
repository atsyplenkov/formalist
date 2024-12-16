<!-- badges: start -->
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fformalist.anatolii.nz)](https://formalist.anatolii.nz/) [![Open VSX Downloads](https://img.shields.io/open-vsx/dt/atsyplenkov/formalist?label=Open%20VSX%20downloads&color=c160ef)](https://open-vsx.org/extension/atsyplenkov/formalist) [![Deploy Extension](https://github.com/atsyplenkov/formalist/actions/workflows/publish-extensions.yml/badge.svg)](https://github.com/atsyplenkov/formalist/actions/workflows/publish-extensions.yml) ![GitHub License](https://img.shields.io/github/license/atsyplenkov/formalist?color=blue) [![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://img.shields.io/badge/repo_status-WIP-yellow)](https://www.repostatus.org/#wip)
<!-- badges: end -->

# Formalist — Positron Extension

> ⚠ The extension is designed to work ONLY in
> [Positron](https://github.com/posit-dev/positron) IDE starting from version 2025.01.0, as it heavily depends
> on the Positron API.
> 
> ⏰ It will be published on the Open VSX Registry soon.

This is an extension to help add explicit R function calls instead of implicit ones using the [`{pedant}`](https://github.com/wurli/pedant) R package. In other words, it checks the currently attached packages, i.e., the ones already loaded using `library()`, and transforms R function calls like `select(mtcars, mpg, cyl)` to `dplyr::select(mtcars, mpg, cyl)`.

![](https://github.com/atsyplenkov/formalist/raw/master/assets/formalist_demo.gif)

# Installation

~~The extension is published on the [Open VSX Registry](https://open-vsx.org/extension/atsyplenkov/formalist): just click `Install` there or manually install it with:~~

~~1) Start the [Positron](https://github.com/posit-dev/positron).~~

~~2) Inside Positron, go to the extensions view either by executing the `View: Show Extensions` command (click View -> Command Palette...) or by clicking on the extension icon on the left side of the Positron window.~~

~~3) In the extensions view, simply search for the term `formalist` in the marketplace search box, then select the extension named `Formalist` and click the install button.~~

Alternatively, you can install the latest version from the [Releases](https://github.com/atsyplenkov/formalist/releases/) page. Download the latest `.vsix` file and install it as described [here](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix).


# Contributions

Contributions are welcome! If you'd like to contribute, please, fork, submit a
PR and I'll merge it.

