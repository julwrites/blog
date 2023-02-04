---
title: "Migrating my Golang Bot to Google Cloud Run"
description: "Prior to this, I had hosted my Telegram Bot on Google Cloud App Engine"
pubDate: "Jan 07 2022"
heroImage: "/assets/blog/2022_01_07_Golang_Bot_Cloud_Run/Cloud_Run.png"
---

Prior to this, I had hosted my Telegram Bot on Google Cloud App Engine, and this had worked decently well - for years, I might add - until recently I did a routine check on my bill statements and discovered that I had a $3 charge from Google. 

Now, $3 isn't a lot, and it wasn't a problem for me to pay for it, but the fact that my bot's usage of compute power had broken the free barrier for the first time in years was either a very happy thing, or a troubling one. 

Turns out, it was the latter. 

I was getting a failing request that would repeat every 5 minutes, and while this wasn't enough to bring down the service, it was certainly enough to cost more in terms of compute time. 

After some discussion with a friend, I decided that I should do two things:
1. Fix the failing request, which would prevent this repeated message issue
2. Migrate to Google Cloud Run, which would reduce cost if it did re-occur

## 1. Go Modules

My last update to this repository had been a few years ago, when Go had not yet developed a mature package ecosystem (even now this seems contentious). 

But since I wanted to containerize it, it was useful to also use a package management system rather than pulling the latest github repository of any dependency I wanted. If nothing else, this allowed me to selectively update dependencies, or freeze them to prevent any deployment surprises. 

A quick `go mod init` followed by `go mod tidy` sufficed.

## 2. Containerization

Google Cloud Run uses containers to spin up a serverless instance, which then dies after the request has been handled. As such, I needed to containerize my solution - i.e. Dockerize. 

Using a template for a Go module deployment, I modified the necessary files and built the container with little issue. 

I had to do a little trick to include my secrets file into the image, which was just to copy the `secrets.yaml` from the build directory into the container, and then deploy the container. 

Since I never pushed the `secrets.yaml` to Github, this was technically pretty safe, and I was okay with this approach so far. 

## 3. Google Artifact Registry

I didn't have GCloud CLI on my device, so I had to get that installed and set up. 

```
gcloud config set project ${PROJECT_NAME}

echo $CI_SERVICE_KEY > key.json

gcloud auth activate-service-account \
  $CI_SERVICE_ACCOUNT --key-file=key.json
  
gcloud auth configure-docker \
  "${ARTIFACT_REGISTRY_REGION}-docker.pkg.dev" 
```

![Service_Accounts.png](/assets/blog/2022_01_07_Golang_Bot_Cloud_Run/Service_Accounts.png)

This wasn't too difficult. I had to create a service account on GCloud and prepare the key, and I was able to authenticate Docker on my machine against Google Artifact Registry. 

Building and pushing the container was also not difficult manually. 

```
docker build -f Dockerfile -t $CONTAINER_IMAGE  .

docker push $CONTAINER_IMAGE

gcloud run deploy $CLOUD_RUN_SERVICE_NAME \
  --image $CONTAINER_IMAGE \
  --region $CLOUD_RUN_SERVICE_REGION
```

It was pretty easy to verify these processes succeeded, just by checking the Artifact Registry and Cloud Run panels respectively. 

![Artifact_Registry.png](/assets/blog/2022_01_07_Golang_Bot_Cloud_Run/Artifact_Registry.png)
![Cloud_Run.png](/assets/blog/2022_01_07_Golang_Bot_Cloud_Run/Cloud_Run.png)

Up to this point, I was able to manage quite decently, and the immediate issue was fixed within the day. 

I retired the old AppEngine version of the service, and moved on. 

## 4. CI/CD with Github Actions

Up to this point I was able to ensure security by basically running this whole process only on an authenticated device; i.e. my laptop. I needed to authenticate Github Actions to do the same thing. 

I quickly discovered that Github Actions did not have the same idea of 'secure' that I did. It took me awhile and a lot of experimentation to figure that I not only needed to have the Service Account, but also...

1. To set up GCloud Auth on the project
2. A step which I forgot, and which cost me a couple of days of debugging - to authenticate Docker with GCloud Auth

![Github_Actions.png](/assets/blog/2022_01_07_Golang_Bot_Cloud_Run/Github_Actions.png)

In the process of debugging, I also went ahead and upgraded my security method to use Google Auth's Workload Identity Federation, following [this post](https://cloud.google.com/blog/products/identity-security/enabling-keyless-authentication-from-github-actions).

Once those were done, it was a pretty simple process to serialize the secrets from Github Actions into the docker container, and then to run the same steps as above from Github Actions. 

