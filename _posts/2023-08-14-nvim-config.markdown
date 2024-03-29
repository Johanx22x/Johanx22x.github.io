---
layout: post
title:  "Neovim Config"
description: "This post contains my basic information about my configuration for the Neovim text editor. Feel free to use it as a starting point for your own configuration, or just pick and choose the settings you like."
date:   2023-08-14
category: lectures
permalink: /blog/nvim-config
image: "/assets/img/nvim-project.jpg"
---

This post contains my basic information about my configuration for the Neovim
text editor. Feel free to use it as a starting point for your own
configuration, or just pick and choose the settings you like.

For more information or contributing you can refer to my repository:
[nvim](https://github.com/Johanx22x/nvim).

## Installation

- Install Neovim (version 0.5 or higher) on your system.

- Install Packer on your system.

- Clone this repository into your `~/.config/` directory:

<pre>
    <code class="language-html border">
git clone https://github.com/Johanx22x/nvim.git
    </code>
</pre>

- Start Neovim and run :PackerInstall command to install any 
plugins specified in the configuration file.
Note: If :PackerInstall does not appear it is due to a bad installation 
of Packer, make sure to verify that it is installed correctly. On Arch 
Linux the package appears as `nvim-packer-git` in the AUR.

## Dependencies

- `Python3`: Required for various plugins, such as `UltiSnips`.

## Usage

The configuration file is divided into several sections, each with its own 
set of settings. Here's a brief overview of what's included:

- `settings.lua`: Here are the general Neovim settings such as the color scheme, 
transparency, among others.

- `lsp.lua`: LSPs configuration.

- `mappings.lua`: The key mapping.

- `plugins/init.lua`: Here is the list of all the plugins for the Neovim configuration.

- `plugins/setup.lua`: Load specific settings for each plugin.

- `plugins/<plugin-name>.lua`: Plugin configuration.

