---
title: "Trying to make a USB Camera from Raspberry Pi 3B+"
description: "I didn't have a camera on my Mac Mini, but I did have a Raspberry Pi and Pi Cam"
pubDate: "July 1 2023"
heroImage: "/blog/assets/blog/2023_07_01_Raspberry_Pi_USB_Camera/libcamera_test.png"
---

So this all started after I bought a Mac Mini for personal use. I wanted a small but stable device that would plug into my existing displays and provide peak performance. And since I already had a Surface Go, this was my best option. 

For the most part, I love it. It's fast, it's quiet, it's easy on the electrical bill... But then I had to take a video call.

I did some research on options for a web camera, but something about having to buy a device that I think I will use maybe 10 times a year kind of irked me. Not to mention that my growing collection of unused electronics irks my wife. So with a bada-Bing bada-Bard, I figured I could use one of my spare Raspberry Pi's, and a lonely Raspberry Pi Camera module, to be my new USB camera. 

## Raspberry Pi 3B+ and Pi Camera

I followed this [article](https://www.raspberrypi.com/tutorials/plug-and-play-raspberry-pi-usb-webcam/) from Raspberry Pi's official website, which was the only one claiming it could run on Raspberry Pi 3B+ (which was the only Pi I had free which was able to plug in my 5MP Pi Camera rev1.3 FFC). There were others - including this one - which claimed to work well with the Pi Zero W, but I didn't have the FFC for that, and I wanted to see if I could get it working without having to buy anything more. 

After a lot of trial and error, I finally came down to booting up the Pi and then trying to start up the script manually so that I could observe the output. This showed me 'no cameras available', and after a little digging with this error message, I unearthed this [libcamera Github issue](https://github.com/raspberrypi/libcamera-apps/issues/125). 

Another couple of tries later, I found the settings that I needed for `/boot/config.txt` (conveniently I also found that I could access this from the SD Card directly, which saved me some hassle after I bootlocked myself once). 

```
[all]
dtoverlay=vc4-fkms-v3d
dtoverlay=dwc2
dr_mode=otg
```

The same Github issue mentioned `dtoverlay=vc4-kms-v3d`, which in my case was already set. 

![Successful Test Image!](/blog/assets/blog/2023_07_01_Raspberry_Pi_USB_Camera/libcamera_test.png)

Now this led to the next problem; although running the script now seemed successful, it wasn't connecting on any of the USB ports. So it was time to look at `uvc-gadget`. And this is where I got stuck, no matter how many times I changed the boot config, or enabled the settings, the camera wouldn't connect to my Mac Mini.

## Raspberry Pi B and OTG

After some research, I finally found an [article](https://raspberrypi.stackexchange.com/questions/54871/is-there-a-way-to-make-a-rp3-b-act-as-a-usb-gadget-periferal) stating that OTG is not available on the Raspberry Pi 3B+, because it didn't have a fast enough USB hub connection to the CPU to act as a slave device. 

And given that I didn't have another type of Raspberry Pi (I only have B's), this camera module seemed doomed to be a video monitor of sorts, rather than a USB Camera like I had hoped.

Looks I'll be getting a Pi Zero camera module after all. 

## Other options

I won't document the next step, since it seems like it might not be much interesting detail, but here are some options I have for the Raspberry Pi.
- [PiWebcam](https://github.com/piwebcam/PiWebcam)
- [MJPG Streamer](https://github.com/jacksonliam/mjpg-streamer)
