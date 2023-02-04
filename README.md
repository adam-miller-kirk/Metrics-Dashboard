# Metrics-Dashboard

Metrics-Dashboard is an internal tool to help Alice keep track of her booming 3D printed jewelry for cats for business.

## Setup

This is a React project and it comes with set docker files that allow it to run inside a container. When installing for the first time there are several steps that need to be followed in order for the projct to work.

1. Install NodeJs, Docker and Yarn on your operating system.
2. Run the command "yarn install" to allow the project to install the node_modules
3. create an .env file. An example has been provided below to help with the .env file creation

### BEARER_TOKEN

The bearer token provides our api with the authentication of using the airtable API. In order for the project to use these APIs we will need to provide the bearer token inside the header of the requests. By referencing the bearer token from inside the .env file we are reducing the risk of leaving sensitive information for anyone to find. To create a token go to <https://airtable.com/account> and follow the instruction on how to create a bearer token. Once completed save the value inside the .env file under the key BEARER_TOKEN.

### BASE_ID

Once you have the bearer token setup we can make calls to airtable API. We will use an API to help identify and set our BASE_ID. Using Postman we can create a GET request that returns all bases of our project. From there we can determine which file id we need. From the return json find the project name you want and use the id above. Place this id inisde the BASE_ID string

### TABLE_ID

Finally we need to get the TABLE_ID that we wish to use. Use Postman once more to call <https://api.airtable.com/v0/meta/bases/{{baseId}}/tables>. The baseId is the id we just saved to the BASE_ID. This api call will return a list of json showing all tables in this project. Find the table you wish to use and copy the top id value. Save this value to the TABLE_ID and the project is good to go.

## Local development

With the values in the .env file set we can now start running the porject. To bring up the project in a local development mode open a command terminal in the root folder of the project and run the command "yarn dev". This will bring up a local server and the project can be seen by going to <http://localhost:8080/>

## Production

The project can also be launched using docker. The files are already in place so launching the project in development mode can be done by running the following command "docker-compose up -d --build". In short this will create an image based off the files in this project. It will then create a container and run the project. The project can be seen by going to <http://192.168.0.184:8080/>
