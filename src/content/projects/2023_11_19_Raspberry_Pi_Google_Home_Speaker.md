---
title: "Turning a Bluetooth speaker into a Google Nest"
description: "My Raspberry Pi was still not being used, so I decided to make it a Google Home device"
pubDate: "November 19 2023"
---

I still had the Raspberry Pi Zero W from the last time I tried to [make a USB Camera](https://tehj.io/blog/projects/2023_07_01_raspberry_pi_usb_camera/). Since that didn't work, I thought I'd try again with a different use case. We had recently done some upgrades to our smart home setup, and moved some of the speakers around, and we had one bluetooth speaker which was just sitting around now (Sonos really made their system so easy to use that it's hard to go back to the 'dumber' speakers). 

A bit of research and I found this [article](https://www.instructables.com/DIY-Google-Home-With-Bluetooth-Speaker-on-Raspberr/), which I thought I could use with just a few modifications since I didn't have the docking hub they mentioned (and I wanted to use bluetooth for this speaker).

## Problems with Bluetooth Connection

Immediately I ran into some issues following this approach. For some reason, using `bluetoothctl` and trying to connect to my bluetooth speaker wasn't working. It was able to scan, pair, and trust the device, but connecting always resulted in a failure. Looking around on the internet, I went through a couple of possible solutions, but none of them seemed to work. 

Eventually I came across a [blog post](https://berthaamelia.github.io/blog/python/raspberrypi/2020/08/20/connect-bluetooth-speaker-to-raspi-zero.html) of someone who seemed to have done something rather similar to what I was trying. She (I think?) had documented this in a [Github Gist](https://gist.github.com/actuino/9548329d1bba6663a63886067af5e4cb), which had instructions on how to replicate this. 

After going through the steps listed, the connection worked! I additionally went through the comments and also installed a couple more packages, and enabled the `a2dp` plugin for the bluetooth service. 

### Steps:
```
sudo apt-get update 
sudo apt-get dist-upgrade
sudo reboot

sudo apt-get install pulseaudio pulseaudio-module-bluetooth bluez-tools
pulseaudio --start
```

I created a file to override the bluetooth service configuration at `/etc/systemd/system/bluetooth.service.d/01-disable-sap-plugin.conf`
```
[Service]
ExecStart=
ExecStart=/usr/lib/bluetooth/bluetoothd --plugin=a2dp
```

Followed by
```
sudo systemctl daemon-reload
sudo systemctl restart bluetooth.service

sudo bluetoothctl
```

The `bluetoothctl` commands are fairly straightforward if they work:
```
power on
agent on
default-agent
scan on
pair <MAC Address>
trust <MAC Address>
connect <MAC Address>
quit
```

Then I tested it with a little sound file. 

After this I went back to the original article and set up my `.asoundrc` file to enable the mic. 

## Setting up Google Assistant

The first thing I noticed was that the Google Assistant Library was deprecated, but the Google Assistant Service SDK was viable, and there were instructions for [Raspberry Pi](https://developers.google.com/assistant/sdk/guides/service/python/embed/setup). 

I was able to access the actions SDK, and register my device model according to the article, and then I went back and started on setting up the python service for Google Assistant to run. 

The setup instructions were fairly straightforward, but with a couple of things that needed tweaking. I had to install `grpcio` manually, because pip kept trying to build the latest supported version, and installing any of the others ran into a checksum issue.

And then I realized that `google-oauth-tool` required Python 3.9 because of a dependency that was [affected](https://stackoverflow.com/questions/69381312/importerror-cannot-import-name-mapping-from-collections-using-python-3-10/70557518#70557518) in Python 3.10. 

After some experimenting, it turned out I couldn't just install Python 3.9 on RasbianOS Bookworm, so I had to go and re-flash my Raspberry Pi with RaspbianOS (legacy). 

But once I had Python3.9 installed, I was able to run the commands quite straightforwardly, and then re-do my bluetooth setup.

```
sudo apt-get update
sudo apt-get install python3-dev python3-venv
python3 -m venv env
env/bin/python -m pip install --upgrade pip setuptools wheel
source env/bin/activate



sudo apt-get install portaudio19-dev libffi-dev libssl-dev
pip install --upgrade google-assistant-sdk[samples] google-auth-oauthlib[tool]
```

## Google Assistant SDK Sunset

And then here is where the whole project just got blocked. Turns out, the Google Assistant SDK has been [sunset](https://developers.google.com/assistant/ca-sunset), and so... There died also my dreams of plugging a Raspberry Pi Zero into a speaker and having an extra Google Nest. 

Not all is lost, being able to connect the Rasberry Pi Zero to a bluetooth speaker is one sort of win, and perhaps it is useful to still play audio through it, but it doesn't meet the need I have at the moment. 

So... On to the next Raspberry Pi Zero project! 

