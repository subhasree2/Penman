# Penman 
Penman is a site to create, read, update and delete blogs. It allows the users to express their thoughts and post it. This project is done as part of my React full stack learning curve.

> **The art of writing is the art of discovering what you believe**
---
## Technology Stack :
    React, Nodejs, Expressjs, MySQL, Sequelize 
## State Management :
    UseContext Hook
---
## Features :
- Writer can create the blog with two options,
    - Text Editor 
    - Markdown Editor
- Seperate public profile page for each user along with their posted blogs.
- User can see the posts liked by them in a seperate page.
- Authentication is implemented with bcrypt, json web token and sessionStorage.
- Additionally, Like and Comment sections are provided.

---

### Working of this project :
- Clone this repository in your local machine 

      git clone https://github.com/subhasree2/Penman.git
- Open two terminals each for client and the server in your code editor (Example : VS Code)
- Set up Nodejs , Expressjs and mysql in server

        npm install
        npm install express 
        npm install cors
        npm install mysql2
        npm install sequelize sequelize-cli
        npx sequelize init
        
- Start the client 

       npm start

- Start the server

       npm start
---

### Setting up the database :
- Create a new schema in MySQL Workbench 
- Change the username, password and database name in config.json in server
```
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "schemaName",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```
- All the required tables will be automatically created by the sequelize orm.
