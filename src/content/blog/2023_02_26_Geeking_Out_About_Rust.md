---
title: "Geeking out about Rust"
description: "So recently I have been looking into Rust"
pubDate: "Feb 26 2023"
---

Not so long ago, my primary language for programming was C++, and I was quite comfortable with it. This was the first programming language I actually learned in earnest while at [ DigiPen ](https://www.digipen.edu/), and I think I got pretty decent at it through the following 9 years programming almost entirely in C++. I still am, although a little rusty (pun sort of intended) since I have been pursuing language agnosticism as a technical goal. 

I heard about Rust through a friend some years back, and initially was a little apprehensive. It seemed like C++ with more rules, and that just seemed a little unnecessary. I realized not too long after that these rules made a lot more difference than they seemed. Just the ability to guarantee the existence of a reference eliminated problems that plagued much of my development experience. 

Suffice to say, I have been interested in learning Rust for some time now. 

## The snowball into Rust

The same friend got me interested in Vim, which I now use as my primary editor for anything text-related. This drove me toward having a better terminal experience, and therefore better CLI tools. 

For a long time, this meant turning to languages like Python and Javascript, which had large ecosystems of tools that could run locally, decent-ish package managers, and enough people using them that I could be confident of finding a way to get around most issues. 

Cut to my paternity leave, which changed my lifestyle in more ways than one. Aside from learning how to change diapers, this gave me pockets of time to not only fix my wonky [ hand-wired keyboard ](https://tehj.io/blog/projects/2022_01_17_redox_keyboard_builds/), but also to redo my [ website ](https://tehj.io/blog/projects/2023_02_09_multi_page_application_elm_astro/), and while I was at it, to do some research and switch over to a better [ Neovim configuration ](https://github.com/julwrites/nvim), better [ terminal ](https://wezfurlong.org/wezterm/), and better [ OS ](https://pop.system76.com/) and [ kernel ](https://github.com/linux-surface/linux-surface) for my Surface Book 2.

As part of this move in my entire development stack, my research led me to find more and more Rust implementations of CLI tools which were just faster, better, and more modern than most CLI tools I was already using. 

## Why Rust tools

A few reasons I think Rust is game-changing for me, even without my writing a single line of Rust.

1. Rust is built for low-level access; it is as fast as you can theoretically get on bare-metal devices
2. Rust package management (aka Cargo) is one of the best I have ever seen
3. Cargo installs can be accessed via CLI with no configuration, and not possibility of conflicting versions

All this means that I can now use a single package manager to install and manage most of my development environment in the terminal, without polluting any other environment space (e.g. brew, or conda, or pip, or npm, or choco, or apt).

## Which Rust tools

Even before this, I was already using some Rust tools, some knowingly and some not really so knowingly. [Ripgrep](https://github.com/BurntSushi/ripgrep), for example, has been part of my Vim workflow since I moved to Neovim. [Neovide](https://neovide.dev/) has also made it in and out of my collection of tools over time. 

Last week I did a bit more research on Rust tools, and started with the terminal. After some looking around, I found [https://wezfurlong.org/wezterm/] and immediately loved it (the command palette sold me).

Today I was half-napping and half-watching videos on Youtube, and came across [this video](https://www.youtube.com/watch?v=dFkGNe4oaKk) by a [ Rust channel ](https://www.youtube.com/c/NoBoilerplate) I follow. He listed a bunch of tools which I am very keen to try out, of which the following seem most attractive. 

1. [ nushell ](https://www.nushell.sh/); To my delight, Nu integrates to Wezterm, so I don't have to choose between terminals. This gives me the ability to use the terminal with more structure, rather than using it as a string-manipulation tool through CLI commands and `.sh` scripts.
2. [gitui](https://github.com/extrawurst/gitui); Much like the author, I often use Git either through my Neovim interface, or from the terminal. This might allow me to consolidate the two, and use the same interface no matter which I am using, with more power.
3. [bat](https://github.com/sharkdp/bat); As a terminal user, I often want to view a file very quickly, and the lack of syntax highlighting does not often help. Now I can view it with all the modern trappings of an IDE, in the terminal, with all the speed of `cat`!
4. [ exa ](https://github.com/ogham/exa); Similarly, as a terminal user I want to navigate my directory with more information and control, and now I can!
5. [rtx](https://github.com/jdxcode/rtx); As a language-agnostic developer, this is one of my biggest pain points; managing versions of the same language across different projects. Currently I use different solutions for different languages, and I've not yet come across a solution that solves all the problems, but this seems very promising.

These aren't all, I am sure. I've seen other nice tools, but they all will require some experimentation to see if they fit in my workflow. Only time will tell.
