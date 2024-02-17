[FRONTEND DEPLOY](https://ikol-bakery-site.onrender.com/)
[BACKEND DEPLOY](https://ikol-bakery-store.onrender.com)

### **Requirements for the Project (Rubric)**
Create a Node/Express application from scratch using the MongoDB database. It must contain the following elements:
 
**Models & Controllers**
- [x] At least two Mongoose data models. One of these must be a User data model, as you need to implement logon.
- [x] Implement user registration and logon. A full stack project, authentication must use JWT tokens.
- [x] Model attributes should use several different data types (number, string, boolean, date, array etc.).
- [x] Include validation of your attributes to prevent the creation of invalid records.
- [x] For any models beside the User model, implement all the CRUD (create, read, update, delete) operations in your controllers and routes.
- [x] Bonus: implement some non-CRUD operations (like searching, sorting, paging, etc.).
- [x] Implement access control middleware so that at least the create/update/delete operations require authentication. You can have unauthenticated read operations if it makes sense in your application.
- [x] Implement access control logic in your controllers, so that one user can’t access another user’s data. This logic must be present for every controller operation or your application is not secure.
- [x] Include appropriate notifications to the user. For full stack applications, the messages should be returned as needed with the API. (For some APIs, the HTTP status code suffices.) Then the front end displays the message or messages to the user. For server side rendered applications, you need to store the message in the user session, perhaps using the connect-flash NPM package.
- [x] Implement error handling middleware so that all exceptions and error conditions are handled and so that the user gets user friendly messages for each event.
- [x] Use best practices in the organization of application code and in indentation. You may want to use eslint and prettier to make sure your code complies.

**User Interface**
The user interface is the front end for full stack applications, or the EJS views for server side rendered applications. In either case, the UI should have these capabilities:
- [x] Registration, logon, and logoff are supported.
- [x] All CRUD operations for each of the data models besided the User model are supported.
- [x] Links or buttons should be provided to help the users navigate the application.
- [x] Style your application. Again, this is not the focus, so keep it simple until you have done everything else.
- [x] Deployment           [FRONTEND DEPLOY](https://ikol-bakery-site.onrender.com)
- [x] Include security protections for your application. Include security packages like xss-clean and helmet, appropriately configured.
- [x] Deploy the application to Render.com.  [DEPLOY BACKEND](https://ikol-bakery-store.onrender.com)

**Bonus Items (these are entirely optional)**
- [x] Do something extra: 

> - more complicated data model
> -  additional NPM packages
> - callouts to other public APIs - cloudinary 

- [ ] Implement some test cases using Mocha, Chai, and Puppeteer.
- [x] For full stack applications, implement Swagger to document the API.
