/*
    Custom auth middleware and JWT verify

    currently we can register a user and get a jwt

    will send that jwt back to the server to be checked and authenticated so that the user
    can access protected routes

    will do this by creating a custom middleware 

    in root created a directory called 'middleware'

    inside 'middleware' :

        created a file called auth.js

        written the auth logint in middleware/auth.js

    implemented the middleware authentication into a protected route (the auth route)

    inside auth.js from (routes/api/auth.js):
        imported the middleware as auth
        passed auth as param to the get() in the request
        now the api/auth route is protected and we cannot access it anymore

        in order for the route to work we need to pass the token in the headers of the request

        test with jwt:
            grabbed token from registered user
            passed in the headers the key: x-auth-token and in value the jwt:

            jwt: 

            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUwOT
            FkODU2MDgxNTUxODRhYjA0OWJmIn0sImlhdCI6MTU3NzY1NTY4NiwiZXhwIjox
            NTc4MDE1Njg2fQ.TKMG-g3E_z1RQg8z9qsEzAK_ik5yTbCWr4xzFYTj008

        now the protected route is accessible

        made the auto route to return the user's data (in users.js in routes/api)



         



    

*/