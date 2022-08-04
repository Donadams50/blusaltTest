# Blusalt test by Olasumbo
 Test assignment by Olasumbo

## Requirement
    - [TypeScript](https://www.npmjs.com/package/typescript)
    - [TS-Node](https://www.npmjs.com/package/ts-node)
    - Docker

## Procedure
    -  Update the env file with the write data
    -  Build  rabbitmq docker container 
    -  Seed the users by running the seed command
    -  Start the customer service locally or with docker build
    -  Start the billing service or with docker build
    -  Start the billing-worker service or with docker build
    -  Test endpoint from postman by calling customer service

## Update env of all services

```
  add the right MongoDB url to customer service env file
  add the right MongoDB url to billing service env file
  add the right MongoDB url to billing-worker service file

```


## Build rabbitmq docker container 

```
  sudo docker run -d --name some-rabbit -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management
  goto http://localhost:15672 to access the dashboard

```

## Seed the user from customer servicethe customer database

```
  cd customer
  npm install
  sudo npx ts-node  src/seeders/customers.seeder.ts

```

## Start the customer service locally

```
   cd customer
  
```

```
  npm run dev
  
```

## Start the billing service locally


```
   cd billing
  
```

```
  npm run dev
  
```

# Start the billing-worker service locally


```
   cd  billing-worker
  
```

```
  npm run dev
  
```

####  Test endpoint from  postman by calling customer service

```
   Go to post man and call get users endpoint to get a user id (customer service runs on port 4000)
  
```

```
   call fund account endpoint with the user id and an amount
  
```


## To Run Docker Build for each services

```
   cd to the root folder /Blusalt
  
```

```
  sudo docker-compose up -d --build
```