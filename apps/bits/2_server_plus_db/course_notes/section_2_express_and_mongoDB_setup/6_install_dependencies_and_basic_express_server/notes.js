/*
    created project folder 'devconnector'

    inside project
        created .gitignore and added node_modules/ to it

        in order to build the express server and the api we first initialize
        a package.json file
            ran:
                npm init

        installed regular dependencies
            ran:
                npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request 

                *request = a module that allows http requests to another API (e.g. for github repos)

        installed dev 
            ran:
                npm i -D nodemon concurrently 


        created server.js in the root directory of the project and started working on 
        the server

        set up a basic server (see basic_express_server)

        added custom npm scripts to run the server:
            scripts object in package.json so far:
                    "scripts": {
                        "start": "node server",
                        "server": "nodemon server"
                    }

        in order to start the server run:
                    npm run server

        tested connection with postman and in browser and server works



*/