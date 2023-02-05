---
title: "Setting up Flutter"
description: "I wanted to try out Flutter, but without using Android Studio"
pubDate: "Feb 12 2022"
heroImage: "/blog/assets/blog/2022_02_12_Flutter_Setup/Flutter_Test_Drive.png"
---

So my wife and I had made a goal to write a small full stack app for ourselves this year, and after a bunch of deliberation we finally settled on Flutter as our front-end framework. Partly because it was up and coming, but also partly because it already supported Android, iOS, and Web, and lately it supports Windows as well. 

Flutter itself is pretty easy to [set up](https://docs.flutter.dev/get-started/install); basically download the SDK and drop it wherever you like, and add that to your path.

Once that's done, running `flutter doctor` will tell you what you need to install to round out your development environment, which is hugely useful. 

## Setting up Flutter without Android Studio

But as a Vim/Emacs user, I am much more comfortable with the command line than with an IDE now, and I really didn't want to have to figure out Android Studio along with Flutter development. Thankfully, it is possible to just get [Android Command Line Tools](https://developer.android.com/studio#downloads) and use this to install everything else (and without having to install the bloated Android Studio). So I did! 

This downloaded another `.zip` file, which I promptly unzipped and dropped next to flutter, and with a bit of fiddling around with environment variables while referring to a [guide](https://proandroiddev.com/how-to-setup-android-sdk-without-android-studio-6d60d0f2812a) I finally got it to work with the following folder structure:

![Android SDK Cmdline Tools](/blog/assets/blog/2022_02_12_Flutter_Setup/Android_SDK_Cmdline_Tools.png)

Some things to note: 
1. We do need to add `ANDROID_HOME` to environment variables
2. We also need to add the `cmdline-tools` and `platform-tools` locations to `PATH`
3. `sdkmanager` needs to be run with the `--sdk_root=` option

## An alternative

Out of sheer frustration, I tried installing Android Studio, promptly regretted my decision, and uninstalled it, and discovered that it had installed the latest platform dependencies and tools in `%LOCALAPPDATA%\Android\Sdk`. Using this, I was able to re-do the installation of the command line tools just for `sdkmanager` and soon after was able to get going again. 

## Back to Flutter

And then after running `flutter doctor` again:

![Flutter Doctor License Missing](/blog/assets/blog/2022_02_12_Flutter_Setup/Flutter_Doctor_License_Missing.png)

And following the advice, we finally got to an acceptable state

![Flutter Doctor Licensed](/blog/assets/blog/2022_02_12_Flutter_Setup/Flutter_Doctor_Licensed.png)

Of course, there are still some errors there, but since I don't yet intend to develop Windows apps on Flutter, and I didn't intend to use Android Studio to begin with, this is fine. 

## Neovim setup

Since I'm using [CoC](https://github.com/neoclide/coc.nvim), I just opted for `coc-flutter-tools` and [dart-vim-plugin](https://github.com/dart-lang/dart-vim-plugin). This does a surprising amount, if the [github page](https://github.com/theniceboy/coc-flutter-tools) is anything to be believed, but I have VSCode's plugin as a pretty well-known backup.

I did a quick test drive following the [Flutter guide](https://docs.flutter.dev/get-started/test-drive?tab=terminal), and in about a minute I had a web app running on my browser. Pretty nifty!  

![Flutter Test Drive](/blog/assets/blog/2022_02_12_Flutter_Setup/Flutter_Test_Drive.png)

I'll get to more configuration on Neovim another day, but for now this looks promising for my own development. 
