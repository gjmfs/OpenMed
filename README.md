
# Project OpenMed

This is an AI Powerd Health Care Project developed because of Lack of Access to Healthcare in Underserved
Communities.

Let's breakdown this Project.
It's used MERN Stack Technology to Develop and we also used Genkit Framework for ease use of Gen AI and testings. Let's get into the Project Environment Setup









## Tech Stack

**Client:** React, Bootstrap, Axios

**Server:** Node, Express JS, Firebase Functions, Firebase Genkit, Google Gen AI

**DataBase** MongoDB

**Authendication** Firebase Authendication



## Installation

Before going to the commands make sure you have installed Git, Node js and Firebase tools

Check npm, git version and firebase-tools 

```bash 
git --version
npm --version
firebase --version
```
install firebase-tools as a Global Package
```bash
npm install -g firebase-tools
```

Clone the Project

```bash
git clone https://github.com/gjmfs/OpenMed.git
```

Change Project Directory
```bash 
cd OpenMed
```

Analyze Project Folders:

-   `client/`: Contains client site codes.
-   `server/functions`: Contains server site functions.


## Install the Necessary Packages

Install Client Packages
```bash 
npm run install-client
```

Install Server Packages
```bash 
npm run install-server
```
> **Note:** These command must run from project root directory. otherwise it won't work

## Environmet file setup for Frontend
 
Go to the Firebase console

* Open your web browser and navigate to the Firebase console: https://console.firebase.google.com/

* Create a Firebase Project. 
* Click the gear icon (Project settings) in the left sidebar.
* Scroll down to the "Your apps" section.
* If you haven't added a web app yet, click the "</>" (web) icon to add one.
* If you have an existing web app, select it.
* You'll find the Firebase SDK snippet. Inside, you'll see the configuration object containing these values:
    * apiKey
    * authDomain
    * projectId
    * storageBucket
    * messagingSenderId
    * appId
    * measurementId (if Google Analytics is enabled)






In General Go to the Bottom you can find "Your Apps" section and if there's no app create new web app.
After Registering new App you can get firebase config for your app. save those configuration for Client site config

Create an env file

```bash
client\.env
```

and save them as 

### .env

```javascript
VITE_PORT="Your_Port_for_Backend_Server"
VITE_apiKey: "Your_API_Key"
VITE_authDomain: "Your_Firebase_authDomain"
VITE_projectId: "Your_firebase_project"
VITE_storageBucket: "Your_stroage_bucket"
VITE_messagingSenderId: "Your_messagingSenderID"
VITE_appId: "Your_appId"
VITE_measurementId: "YourMeasurementId"
```


## Server Environment Setup

Go to the Server site project directory and create .env file

### 1. create .env file under server/functions
1. create an .env file under
```bash 
server\functions\.env
```
2. head into the Google AI Studio and Generate new GEMINI_API_KEY for the project: https://aistudio.google.com/

3. store those mentioned values

```bash
DATABASE_URL="Your_mongoDb_server_url"
GEMINI_API_KEY="GEMINI_API_KEY"
```




### 2. Setup serviceKey into server site code

1. Go to the Firebase Console:
* Open your web browser and navigate to the Firebase console: https://console.firebase.google.com/

* Select the Firebase project you're working with.
2. Access Project Settings:
* In the left-hand navigation panel, click the gear icon (Project settings).
 
3. Navigate to Service Accounts:
* In the Project settings, click the "Service accounts" tab.

4. Generate a New Private Key:
* Click the "Generate New Private Key" button.
 
* A warning will appear, reminding you to store the key securely. Click "Generate Key" to proceed.

* Your browser will download a JSON file containing the service account's private key. This is your serviceAccount.json file.

* save them as a serviceAccountkey.json into 
```bash 
server\functions\serviceAccountkey.json
```



## Run Project
I made some custom script under package.json. \
if you wish you may find them 

1. Open 2 Terminal inside of vs code 
2. Run these commands on seperate terminals
* for server
```bash 
npm run server
```
* for client
```bash 
npm run client
```
> **Note:** These command must run from project root directory. otherwise it won't work

## Deployment
We made some npm script to reduce deploy commands for the developer \
To deploy this project run

* for client
```bash
  npm run deploy-c
```

* for server
```bash
  npm run deploy-s
```
> **Note:** These command must run from project root directory. otherwise it won't work



## For Issues
if you're getting some errors you need to initialize firebase functions inside of server folder.

if you're unable to solve them feel free to reach out via info@cloudlogics.dev
## Support

If you wish to contact us, feel free to reach out via info@cloudlogics.dev or https://www.mufees.space


## Feedback

If you have any feedback, please reach out to us at info@cloudlogics.dev
