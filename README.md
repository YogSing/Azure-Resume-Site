# azure-resume
Azure resume site

## First Steps 

- Frontend folder contains the website. 
- main.js contains visitor counter code. 
- Created Cosmos DB on Azure portal 
- Create database, container and item field
- deployed azure function under backend api 
- Ran the function locally successfully 
- Create AzureResumeConnectionString in local.settings.json and update with cosmos db string
- created code to make counter works on the local site 
- linked frontend with backend so index.html can show site viewed count. 
- Deployed local function to azure function 
- added connection string as well
- got azure function url and added to javascript file 
- deployed forntend app to v2 storage account and it worked with counters. 

## Deployment Steps

### Prerequisites

1. **Install Azure Functions Extension**:
   - Install the Azure Functions extension in Visual Studio Code.

2. **Sign In to Azure**:
   - Sign in to your Azure account in Visual Studio Code.

### Deployment Process

1. **Open Command Palette**:
   - Press `F1` or `Ctrl+Shift+P` to open the Command Palette.

2. **Deploy to Azure**:
   - Type `Azure Functions: Deploy to Function App` and select it.
   3. **Select Subscription**:
   - If you have multiple subscriptions, you will be prompted to select the subscription you want to use.

4. **Select Function App**:
   - You will be prompted to select the Function App to deploy to. If you don't have an existing Function App, you can create a new one.

5. **Select Resource Group**:
   - If you are creating a new Function App, you will be prompted to select or create a resource group. If you don't see the option to select a resource group, ensure you are following the correct steps and that you are signed in to Azure.

## Lession learnt 

1. Deployed function app to another group then used move tool to move resources 
2. If app is not fully deployed then you would be missing HTTP trigger and function itself in azure app. 
3. run function locally if port is busy - func start --port 7072

## How to 

1. Right click on frontend folder and deploy to static site, it will asking for creating 
azure storage account. 
