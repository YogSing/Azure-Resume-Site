# Cloud Resume API with Azure 
Cloud Resume API was created using a serverless Azure Function and Azure CosmosDB. 

## A Step-by-step guide to this project.

## Prerequisites

1. **Install Azure Extensions**:
   - Install the Azure Functions, Storage extension in Visual Studio Code.

2. **Sign In to Azure**:
   - Sign in to your Azure account in Visual Studio Code

3. **Azure CLI**:
   - Download the latest version of Azure CLI
     
4. **GitHub**:
   - Setup GitHub Account
   - Setup SSH Key
   - Create a New Repo

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
  
  **CosmosDb**
  
    ![image](https://github.com/user-attachments/assets/1b2fb845-8bb4-4d93-a9b3-dd7c981aff03)
# Deployed Azure Serverless Function
- Deployed Azure Function locally under backend/API via Visual Studio

  Link to Azure Documentation for a detailed guide: https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-python

- **How to run function locally**
  ```
  1. pip install -r requirements.txt
  2. func start
  3. func start --port 7072 (If local host 7071 is not available )  
  ```
- Create AzureResumeConnectionString in `local.settings.json` and update with **Azure CosmosDb String**
  
  **local.seetings.json**

   ![image](https://github.com/user-attachments/assets/fb3697b5-e283-4286-9fcd-26f24a52f476)

- **Connection String is available under CosmosDb>Keys>Primary Connection String**
  
  **Connection String**
     ![image](https://github.com/user-attachments/assets/bdbc535d-e07c-49cc-a485-fa1aeaa9ca2d)

- Added Python code to make counter works on the local site
  ```py
  try:
        client = CosmosClient.from_connection_string(CONNECTION_STRING)
        database = client.get_database_client(DATABASE_NAME)
        collection = database.get_container_client(COLLECTION_NAME)
        items = list(collection.query_items(
            query="SELECT * FROM c WHERE c.id = '1'", #count removed
            enable_cross_partition_query=True
        ))
        if len(items) > 0:
            counter_item = items[0]
            counter = counter_item['count']
        else:
            counter = 0
    except Exception as e:
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
             status_code=500,
             mimetype="application/json",
             headers={"Access-Control-Allow-Origin": "*"}
         )
    # Increment the counter
    counter += 1
  # Update the database
    try:
        # Create a new item if it doesn't exist
        if len(items) == 0:
            new_item = {
                "id": "count",
                "count": counter
            }
            collection.create_item(new_item)
        else:
            # Update the existing item
            counter_item['count'] = counter
            collection.replace_item(counter_item['id'], counter_item)
    except Exception as e:
        return func.HttpResponse(
             f"Error updating Cosmos DB: {e}",
             status_code=500,
             mimetype="application/json",
             headers={"Access-Control-Allow-Origin": "*"}
        )

    # Return the updated count
    return func.HttpResponse(
         json.dumps({"count": counter}),
         status_code=200,
         mimetype="application/json",
         headers={"Access-Control-Allow-Origin": "*"}
     )
  ```
- Linked frontend site with azure function API so index.html can show viewed counter.
  
   **FunctionAPI under main.js**
  ![image](https://github.com/user-attachments/assets/0ee0dffe-e5c0-4f46-abb6-58cc006ac11b)

  
- After successful testing, Deployed local azure function to Azure
  ```
  1. Az Login [verify subscription]
  2. Press F1 and enter Azure Functions: Create Function App in Azure.
  3. Provide name and selected requested variables like function name, resource group etc.
  4. Once the function is created then app can be deployed to Azure
  5. press F1 and select Azure Functions: Deploy to Function App.
  6. Default Azure function app URL would be generated to test functionality. 
  ```
- Add Azure CosmosDB Connection String under Azure function ***Environment Variable**

   ![image](https://github.com/user-attachments/assets/da2c5a56-200f-4f93-a4f7-b806e405408b)

- Get a new Azure Function URL and replace the local URL with a new URL under the main.js file.
- Deploy frontend static app to Azure Storage **V2 kind** account via Visual Studio
   **Static app deployment**
  
    ![image](https://github.com/user-attachments/assets/51b51856-98cd-44ff-8515-8ef50414268a)

- Add Azure Function app URL to Azure CDN under Storage account for low latency.(optional if low traffic site)

# GitHub Actions CI/CD 
- Deployed static site with **GitHub actions**

    A detailed guide on Microsoft Learn: https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=openid
     

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

## Lesson learnt 

1. If you accidentally deployed the function app to another resource group then use the move tool to move resource groups via the Azure portal.  
2. If the app is not fully deployed then you would be missing the HTTP trigger and function itself in the Azure app. Retry to deploy the app to Azure. 
3. If running the function locally and the port is busy then you can use `func start --port 7072` cmd to switch port.
4. When adding a secret on GitHub action then make sure to provide the client secret **value** not ID otherwise it would give a login error while running the GitHub workflow.
5. Make note of all important cmds and secrets to avoid confusion.
6. Make sure the extensionBundle version is up to date(`host.json`) to avoid binding errors.
7. Requirements.txt should have all required libraries to support the project such as `azure-functions, azure-cosmos` 
   

## How to 

1. Right click on frontend folder and deploy to static site, it will asking for creating 
azure storage account. 
