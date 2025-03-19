# Cloud Resume API with Azure 
Cloud Resume API was created using a serverless Azure Function and Azure CosmosDB. 

## A Step-by-step guide to this project.

# Frontend
- The frontend folder contains `HTML,CSS,and Javascript` files to run the frontend of the resume site. 
- main.js contains JavaScript code to fetch the visit count from API and display it on the Webpage.
  ```Js
      window.addEventListener('DOMContentLoaded', (event) => {
             console.log("DOM fully loaded and parsed");
             getVisitCount();
         });
         
         // const functionApi = 'http://localhost:7072/api/ResumeCounter';
         const functionApi ="resumeapiyogdeep.azurewebsites.net"
         // "https://resumeapiyogdeep.azurewebsites.net/api/ResumeCounter?code=JDnKptYRJSCJxCkYO3iUwYaz-zIY4h5VvORHW8Z1Iz53AzFuFxVHuw=="
         const getVisitCount = () => {
             console.log("Calling function API:", functionApi);
             fetch(functionApi).then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok ' + response.statusText);
                 }
                 return response.json();
             }).then(response => {
                 console.log("API response:", response);
                 const count = response.count;
                 document.getElementById("counter").innerText = count;
             }).catch(function(error) {
                 console.error("Error fetching counter:", error);
                });
            }     
  ```
  # Deployed CosmosDB to store Counter data
- Created CosmosDB Serverless DB on the Azure portal to store counter data.
    ![image](https://github.com/user-attachments/assets/1b2fb845-8bb4-4d93-a9b3-dd7c981aff03)
# Deployed Azure Serverless Function
- Deployed Azure Function locally under backend/API via Visual Studio

  Link to Azure Documentation for detailed guide: https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-python

- **How to run function locally**
  ```
  1. pip install -r requirements.txt
  2. func start
  3. func start --port 7072 (If local host 7071 is not available )  
  ```
- Create AzureResumeConnectionString in local.settings.json and update with cosmos db string
- created code to make counter works on the local site 
- linked frontend with backend so index.html can show site viewed count. 
- Deployed local function to azure function 
- added connection string as well
- got azure function url and added to javascript file 
- deployed forntend app to v2 storage account and it worked with counters. 
- Azure CDN for low latency 
- CI/CD create .github directory >worlflow > frontend.main.yml/backend
-az ad sp create-for-rbac --name AzureResume --role contributor --scopes subscriptions/ddd46a73-d9f0-4223-a18d-1dd4c4b8c68c/resourceGroups/resumeapiyogdeep
- created secret Azure_Credentials
- added workflow to frontend -source azure

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
