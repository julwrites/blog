---
title: "Re-writing my website in Elm"
description: "I had been gaining interest in Functional Programming and its' paradigms for awhile, and looking for a small project to do with it."
pubDate: "Feb 02 2022"
heroImage: "/assets/blog/2022_02_02_Elm_Website/Home_Page.png"
---

I had been gaining interest in Functional Programming and its' paradigms for awhile, and looking for a small project to do with it. 

So I went and did some research, and figured that I could either try writing the website in something like [ClojureScript](https://clojurescript.org/) to get more familiar with Lisp, or take on something like [Flutter](https://flutter.dev/) to get more familiar with declarative UI. 

Then I came across Elm, and it was quite interesting. It had the functional paragadim so strongly embedded because of its roots in Haskell, and it was strongly typed - which I like - and it compiled to Javascript.That, plus several other claims which it made, were really attractive to me. This [talk](https://www.youtube.com/watch?v=kEitFAY7Gc8) especially convinced me.

Eventually I figured that I would just try using Elm to re-write this website (it was between re-writing in Elm or migrating from Vue 2 to Vue 3, and like usual I figured why not take the harder parth?)

## Learning Elm

So I spent some time getting familiar with Elm, working through the [guide](https://guide.elm-lang.org/) and getting impatient, and looking through the [packages](https://package.elm-lang.org/) to find some ways to make my noob life a little easier. 

I settled on [Elm-UI](https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/) as my UI styling package, and - kind of throwing myself at the problem full-force - managed to clobber a site together with just the first page looking sort of like my old site; basically some text and links. 

I then went on to implement some of the other pages, my projects and bio pages, and those weren't too bad either, more or less the same sort of stuff.

Then I hit the blog page, and everything kind of crashed to a standstill. See, Elm is a functional language, and it does not like things like doing two things at once (for example, loading a page, and loading a markdown file at the same time). This meant that I was able to load the blog page, or load the blog file, but not both at the same time. 

## Using elm-pages

After trying a number of workarounds which didn't work, I eventually searched for a solution on [Elm Discourse](https://discourse.elm-lang.org/) and found that indeed it wasn't possible to load a markdown file at the same time as a page, and that I would have to instead generate the static html for the blog. 

Thankfully, this was already a decently well-considered problem, and other brilliant minds had already solved it. I picked the one which was more extensible - [Elm-Pages](https://elm-pages.com/) and worked through the examples. That got me pretty far; I was able to use it to render my blog's markdown to html, and to do all the necessary pages. 

At this point it felt not so different from Vue 2, except that I was working in one language rather than in 3 (since Elm, Elm-UI, and Elm-Pages were all well-defined in Elm, I didn't have to touch HTML or JS or CSS at all). Not to mention that things were very much more solidly defined, because Elm forces every type used to be well-defined, and every case to be handled.

There was just one issue; I couldn't get the images to render according to the width of the window. To resolve that, I had to write my own Markdown parser so that I could control the dynamic sizing of the elements. Unfortunately, I didn't find a solution for code blocks resizing (surely my own ignorance).

![Broken_Codeblock.png](/assets/blog/2022_02_02_Elm_Website/Broken_Codeblock.png)

## Setting up CI/CD

Once all the pieces were in place, I modified the CI/CD script I had on Github Actions. I had to change it a little - for some reason I could use Yarn on my device, but it would fail on Github Actions - to use NPM instead. 

![Github_Actions.png](/assets/blog/2022_02_02_Elm_Website/Github_Actions.png)

Other than that, everything looks and runs smoothly, and I'm pretty pleased with this. I'll probably revisit it again sometime in the future to fix the code blocks and other such things, but for now this works.

![Home_Page.png](/assets/blog/2022_02_02_Elm_Website/Home_Page.png)

