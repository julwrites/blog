---
title: "Setting up PiVPN and PiHole"
description: "I wanted more control over my network traffic, and the ability to tunnle"
pubDate: "Feb 11 2023"
heroImage: "/blog/assets/blog/2023_02_11_PiVPN_PiHole/PiVPN.png"
---

## Pi Networking

I've been using [PiHole](https://pi-hole.net/) for awhile, and in a few configurations. At one point it was my DHCP server, and that worked quite well especially when I wasn't keen on using my ISP's router settings and wanted more control. 

![PiVPN](/blog/assets/blog/2023_02_11_PiVPN_PiHole/PiVPN.png)

But since I set up Homeassistant recently, I've been wondering about a way to access my home network remotely, so that I could still check on home without needing something like Google Home. A little googling and I found [PiVPN](https://pivpn.io/), which looked perfect. 

It promised VPN connections on both OpenVPN and Wireguard (I was happy with just Wireguard), and it was able to run alongside PiHole. In fact, it is actually one of their features.

As an added bonus, this could be installed alongside PiHole, which meant I didn't have to re-flash my PiHole (which I would have to do if I chose to use OpenWRT instead)

The downside though? There was no Web UI. But honestly, that's probably fine. I asked myself: How many clients do I want to connect and how often? And the answer was probably just the one or two personal devices.

## Setting up PiVPN

Now came the fun part. I obviously didn't want to just bind the public address of my home network for access through Wireguard, so I needed to set up some other method that would at least make that IP address hidden from any client point of view. 

Enter Dynamic DNS! PiVPN had some guides for [Dynamic DNS setup](https://docs.pivpn.io/guides/dynamic-dns/), which led me to [Duck DNS Dynamic DNS setup](https://www.duckdns.org/install.jsp). The steps themselves were fairly straightforward, and I was able to adapt them to [ Namecheap ](v), which is the DNS provider that I use. They similarly had a guide on how to [dynamically update the host IP](https://www.namecheap.com/support/knowledgebase/article.aspx/29/11/how-to-dynamically-update-the-hosts-ip-with-an-http-request/)

Once that was set up, I was good to go! I just ran the commands for adding clients and generating the necessary QR Codes or config files, and got the individual clients set up. 

![PiVPN Add](/blog/assets/blog/2023_02_11_PiVPN_PiHole/PiVPN_Add.png)

Now I can access my Homeassistant configuration remotely through the Wireguard tunnel!

## The final blow

![Wifiman](/blog/assets/blog/2023_02_11_PiVPN_PiHole/Wifiman.png)

Turns out, I was actually able to tunnel into my network using [ WifiMan ](https://wifiman.com/), since I am using a Ubiquiti router. So maybe this whole project was a little moot, but no harm having an open source option, right? 

