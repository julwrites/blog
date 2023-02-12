---
title: "Multi-page Application with Elm and Astro"
description: "I wanted to try yet another frontend framework, so I decided to split off my blog"
pubDate: "Feb 09 2023"
---

I wanted to do more writing outside of my project log, partly as a way for me to just practice writing, and partly so I could have a form of expression for my thoughts. 

After looking around and consulting friends, I decided to try [Astro](https://astro.build), which offered a really straightforward setup and a ready template for blogs. The idea was to split [tehj.io](https://tehj.io) into two parts; 

1. The landing page (still in [Elm](https://elm-lang.org/), because I seem to enjoy making my life difficult), which would feature my portfolio and key links
2. The blog page (now in [ Astro ](https://astro.build), which would have my project log and my blog

Just to keep things simple, I decided I would make [tehj.io](https://tehj.io) a single page application, and I might slim it down even further to make it a little like a business card application in future. 

## Astro set-up

Astro was impressively easy to set up, even easier than React perhaps. It also came with a template for a blog website, which was not too hard to tweak to my purposes. I have yet to do any styling on it, but for now it is useable, and I wanted to get some momentum on writing, so that will come later.

![Astro Build](/blog/assets/blog/2023_02_09_Multi_Page_Application_Elm_Astro/Astro_Build.png)

The resulting website would have two sets of post folders, and all the assets would be contained in Github just like in my previous blog, so I wouldn't have to manage a separate CMS. For me, this is fine, but if I ever wanted more security around my posts, or other editing capabilities, I would probably do an integration with a headless CMS.

![Blog Page](/blog/assets/blog/2023_02_09_Multi_Page_Application_Elm_Astro/Blog_Page.png)

## Github Pages and Subdomain

The promise of [ Github Pages ](https://pages.github.com/) was that I could have as many pages as I wanted, but only one could be on my user domain; i.e. I could have only one `julwrites.github.io`, but as many project pages as I liked, which would all come under `julwrites.github.io/<project>`. 

The problem was, I hoped to put it under two separate subdomains; `www.tehj.io` for my landing page, and `blog.tehj.io` for my blog page. This meant that I needed some way to bind the subdomain to the new website. 

At first I tried to directly set up the CNAME, like I did with the original website, but it turns out that this isn't possible with pages.

![Subdomain Issue](/blog/assets/blog/2023_02_09_Multi_Page_Application_Elm_Astro/Subdomain_Issue.png)

So in the end I just set up my Github project page as is, and removed the CNAME binding, instead allowing it to be a URL redirect; i.e. `blog.tehj.io` just redirects to `tehj.io/blog`, which Github pages handles for me.

## Re-writing Elm

Previously, I had set up my website using Elm-Pages, which meant it was a pre-rendered website that was being deployed. Now that I had split out most of the complex code into a more powerful framework, I could re-write the landing page using purely Elm, and reduce the dependencies (and therefore the load time) of the page. 

This took longer than I care to admit, because I am not an Elm expert, and I have not touched this website in more than a year, I had to go through the same struggle of reading the documentation to figure out how to re-do my website now without Elm-Pages. 

I am ashamed to say that it took me way longer than it should have to realize that the full page was rendering on mobile because I had forgotten to set the `scrollbarY` and `clipY` attributes, which meant the landing page ended up like this.

![Landing Page Mobile](/blog/assets/blog/2023_02_09_Multi_Page_Application_Elm_Astro/Landing_Page_Mobile.png)

After adding that, the rest of it was fairly straightforward, and my landing page - albeit a rather rough looking one - was good to go.

![Landing Page Mobile Fixed](/blog/assets/blog/2023_02_09_Multi_Page_Application_Elm_Astro/Landing_Page_Mobile_Fixed.png)

Overall, I think this wasn't too bad. It was really cool to see how easy it is to set up a new simple website, and I might do more in the future for other sorts of purposes, but this was a nice use of some of my paternity leave. 

