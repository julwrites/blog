---
title: "Homeassistant on Kubernetes Cluster"
description: "I wanted to implement Homeassistant at home, but... reliable"
pubDate: "Jan 13 2023"
heroImage: "/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Homeassistant.png"
---

After moving to my new home, I decided it was time to finally implement some of that open source home automation I had repeatedly told friends and family that I wanted to. I had been using Google Home previously for most of my home automation, but I really wanted to give Homeassistant a shot since I felt I would have more control over it - plus it's always a good idea to take some information out of Google's hands. 

The problem was; the Raspberry Pi I was using for Homeassistant was not the most reliable, and I found accessibility to be a problem long term.

So I decided - and bear with me here, because obviously it was not the best idea - to make a Kubernetes cluster that would run Homeassistant as a service. 

On top of that, I wanted to store the configuration of Homeassistant on my Synology, so that I would always have the configuration available if the cluster ever went down or I found myself needing to re-implement this.

## Setting up Kubernetes

Since I was going to be working on Raspberry Pi's, with the exception of one old laptop, I needed a Kubernetes distro that was lightweight and easy to set up. So I went with [Microk8s](https://microk8s.io/), which was intended for lightweight kubernetes setups, and started following their guide on how to [set up a cluster on a Raspberry Pi](https://ubuntu.com/tutorials/how-to-kubernetes-cluster-on-raspberry-pi#1-overview)

This itself was quite straightforward, and it was easy to get the control plan up, and even set up nodes. I just flashed them with Ubuntu, booted them up, and ran `sudo snap install microk8s --classic` like in the guide, and it was done. It even came with a nice little kubernetes dashboard that was pretty straightforward to [ set up ](https://microk8s.io/docs/addon-dashboard).

![Kubernetes Login](/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Kubernetes_Login.png)

Adding nodes was easy as well, just running `microk8s.add-node` and the corresponding `microk8s.join` got everything linked up and ready to go. I had a little trouble with my Ethernet configurations, but that was resolved with a netplan configuration change and some router settings; apparently creating multiple networks on my Unifi router created more networking trouble than I thought it would.

## Setting up Homeassistant

Since I was running Kubernetes, I had to limit myself to the [ container version of Homeassistant ](https://hub.docker.com/r/homeassistant/home-assistant/), which did mean I wouldn't have as many integrations in-built, but these would be available by hosting them directly on the cluster anyway, so I went ahead with it.

This mean I had to create a deployment that would pull the homeassistant container and deploy it as a service. I also had to map the container's port to a `nodePort` that the cluster would expose. 

All this could be done using `kubectl apply` and the associated `.yaml` manifest. I realized a little ways into this project that I could club multiple such manifest together with a `---` separator, and it would run these in sequence; pretty convenient! 

![Microk8s Kubectl Apply](/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Microk8s_Kubectl_Apply.png)

This gave me a fairly simple way to try out configuration changes without too much difficulty, since I could just modify the spec file and then run `microk8s kubectl apply -f spec.yaml` and it would do all the steps necessary to spin up the containers, nodes, services, deployments, and later the provisional volumes and volume claims. Similarly to delete them, I could run the same with `microk8s kubectl delete -f spec.yaml`.

All this really made me aware of how much easier - not simpler - Kubernetes made the whole process of infrastructure management. 

With some reference to articles and guides from people who have accomplished this same thing, I was able to club together a configuration that spun up all the pieces needed for Homeassistant. 

![Kubernetes Dashboard](/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Kubernetes_Dashboard.png)

## Persistent Volumes

Next I wanted to back up my configuration automatically, and since I had received an old Synology from my Dad, I figured I could probably have the Kubernetes cluster utilize this network storage. It turns out to be indeed possible! It also turns out to be a little niche, which I was a bit surprised at. 

[Enabling NFS on the Synology](https://kb.synology.com/en-us/DSM/tutorial/How_to_access_files_on_Synology_NAS_within_the_local_network_NFS) was fairly easy. The only little tricky bit was that I had to make sure to provide all the permissions correctly, and to find the correct host name. Aside from these two - which were relatively straightforward - the Synology NAS had all the necessary things set up already for the NFS to work.

The Kubernetes side was considerably more complex.

So there are [3 main ways](https://itnext.io/kubernetes-storage-part-1-nfs-complete-tutorial-75e6ac2a1f77) one can attach network storage to a Kubernetes node. 

1. Connect the NFS directly to the container; essentially create a NFS volume on the NFS server, expose it, and specify the volume to be mounted in the container manifest.
2. Create a Persistent Volume; which would create a volume and manage its permissions and lifecycle handling, and give it a name which you can then use in the container manifest.
3. Create a StorageClass; which provisions the Persistent Volume dynamically through an external provisioner service. 
   
Ultimately I ended up creating a Persistent Volume and attaching it to the container manifest after hours of poring through different online resources. [ This was the only answer ](https://www.reddit.com/r/kubernetes/comments/qcfwoz/microk8s_nfs/) I found which adequately provided what I needed.

This allowed me to create a Persistent Volume that mapped to a volume on the Synology NAS, which I would mount on the container as `/config`. So my Homeassistant configuration, all the device definitions, settings, extensions and so on, were backed up into my Synology, which I later backed up onto OneDrive for some good old systems paranoia. 

![Synology Volume](/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Synology_Homeassistant.png)

## Setting up Homeassistant

Once all that was done, I now had Homeassistant running, containerized, with its configuration backed up. I tested this a couple of times by intentionally tearing down and spinning up the whole line of manifests, making sure everything spun up correctly, and then went on to connect all my home devices. 

![Homeassistant Dashboard](/blog/assets/blog/2023_01_13_Homeassistant_Kubernetes/Homeassistant_Dashboard.png)

I think this was a great learning experience for me. I am not a DevOps Engineer or a Backend Engineer, so while I have experience working with Docker containers, the rest of the IaaS stack is quite foreign to me. This gave me a nice insight into how it works, and while I'm nowhere near expert at it, I think I could get by at home.
