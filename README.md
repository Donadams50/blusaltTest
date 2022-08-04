# Blusalt test by Olasumbo
 Test assignment by Olasumbo

## Requirement
    - [TypeScript](https://www.npmjs.com/package/typescript)
    - [Node 18.7.0 and above]
    - [TS-Node](https://www.npmjs.com/package/ts-node)
    - [Docker]

## Procedure
    -  Update the env file with the right data(your mongodb database url)
    -  Build the docker containers for all services
    -  Seed the users by running the seed command
    -  Test endpoints from postman (postman documentation attached to mail)



### Update env of all services

```
  add the right MongoDB url to customer service env file
  add the right MongoDB url to billing service env file
  add the right MongoDB url to billing-worker service file

```

### Seed the user from customer servicethe customer database

```
  cd customer
  npm install
  sudo npx ts-node  src/seeders/customers.seeder.ts

```


### Build the docker containers for services (Rabbitmq , Customer, Billing and Billing-worker)

```
   cd to the root folder /Blusalt
  
```

```
  sudo docker-compose up -d --build
```


####  Test endpoint from  postman by calling customer service

```
   Go to post man and call get users endpoint to get a user id (customer service runs on port 4000)
  
```

```
   call fund account endpoint with the user id and an amount
  
```

## Alternatively
    You can test this project server alternatively by starting all these service one by one manually

### Start the customer service locally

```
   cd customer
  
```

```
  npm run dev
  
```

### Start the billing service locally


```
   cd billing
  
```

```
  npm run dev
  
```

### Start the billing-worker service locally


```
   cd  billing-worker
  
```

```
  npm run dev
  
```

### Start the rabbitmg service locally


```
   sudo docker run -d --name some-rabbit -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management
  
```

####  Test endpoint from  postman by calling customer service

```
   Go to post man and call get users endpoint to get a user id (customer service runs on port 4000)
  
```

```
   call fund account endpoint with the user id and an amount
  
```