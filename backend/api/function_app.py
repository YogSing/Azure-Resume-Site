import azure.functions as func
import logging
import json
from azure.cosmos import CosmosClient

CONNECTION_STRING = "AccountEndpoint=https://azureresumedbyogdeep.documents.azure.com:443/;AccountKey=sXwpQruoX2n5b4O2PdFowy9Z6k4HOTa6G8WDAu9wjwBEnZTk9lVqjVSAPFDvfwUKuOdp6tHzURDVACDbqwKggQ==;"
DATABASE_NAME = "AzureResume"
COLLECTION_NAME = "Counter"

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.route(route="ResumeCounter")
def ResumeCounter(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
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
