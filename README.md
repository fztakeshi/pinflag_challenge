# PINFLAG NODE JS CHALLENGE

## ***Configure application***
### ***Install dependencies***
```
npm install
```
### ***Setup .env variables***
*Must create a .env file with the following variables*
```
DATABASE_URI
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_NAME
DATABASE_HOST
DATABASE_PORT
```

### ***Create database***
*You need docker installed on your computer*
```
docker pull postgres && docker run --name pinflag_challenge_db -e POSTGRES_DB=pinflag_challenge -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### ***Migration with Sequelize***
```
npx sequelize-cli db:migrate
```

### ***Run test with Jest and Supertest***
```
npm run test
```

## ***Assumptions***
 
Request ```GET character/:number```:
- *Number has to be a positive integer*

## ***Documentation***
### [API Documentation Postman](https://documenter.getpostman.com/view/23946151/2s8YzQVPQu)
