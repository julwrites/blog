---
title: "Adding a Markdown blog to my Vue + TS site"
description: "I wanted to add a blog component to my Vue site"
pubDate: "Apr 26 2020"
---

So I've been a C++ application developer for 7 years, and despite my forays into the web stack, I cannot say I'm an expert at it. Nonetheless, I had gone through the process of creating my landing page in plain HTML/CSS, followed by Github Pages in Jekyll, and then finally utilizing VueJS. 

I wanted then to add a blog component to my site, just for me to do write-ups on things I think are interesting enough for me to want to consolidate my knowledge on them and keep them around (not just in my head).

After some research, I ruled out ButterCMS (which Vue recommends) because I wasn't thinking of handling a large volume of posts. The secondary recommendation was Nuxtent, which seemed like it was what I wanted at first, but by the time I managed to get it working, proved to be somewhat incompatible with my existing site.

So a little more research later, here we are. I found a great walkthrough by [Yev](https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd) and this gave me a good starting point. 

Since I was using TypeScript instead of JavaScript, once I got an initial implementation hacked together I had to work out how to get it to run with TypeScript. Doing this I discovered a few things:

## 1. Using a JSON import was tricky in TypeScript. 

Although JSON import is now supported past Typescript 2.9, it imports as an Object, and Typescript does not allow you to retrieve from an Object using a string (in general, I realize, Typescript restricts such behavior so you must use Map instead, which is more well defined). This was a bit of a problem, since the original implementation utilized strings to automatically retrieve the blog sections and define their children. I had to do some work to pull out the sections and simplify the JSON so that it would read a single string for each entry, while also allowing me to easily extend the blog without messing with `router.ts`

I ended up with a `contents.ts` file which had the job of pulling in any of the requisitie content pages and then exporting them so that `router.ts` coult pick them up for routing. 

![contents.ts](/blog/assets/blog/2020_04_26_Markdown_Blog/contents_ts.png)

## 2. Setting up a Contents page

I'm pretty new to web technology, so it was a lot of searching and trial and error to get all the routes correctly linked up. I discovered that `this.$router` could be correctly called in one context and gave me the correct router path, but somehow... failed to do the same when I tried to use it to route the abstracts to my actual blog post. 

It also took a while to re-work the JSON parsing code that [Yev](https://dev.to/vycoder/creating-a-simple-blog-using-vue-with-markdown-2omd) had used in JavaScript into a more strictly typed format that TypeScript would accept. 

Anyway~ 

Moving forward, the plan is to start populating this blog every once in awhile with exposition on technical things, or documentation on my mini-projects (like this one), just as a way for me to force myself to consolidate my knowledge and keep track of it.
