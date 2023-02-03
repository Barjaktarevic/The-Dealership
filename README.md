# The-Dealership (Mono Software application)
Project started on 31 Jan using Vite as the build tool. To view the application in action run:
```terminal
npm run dev
```
... or visit the Netlify website where the app has been deployed: [The Dealership](https://barjaktarevic.github.io/ "Click to visit.")

## Notes about the project
+ For data storage I'm using the Cloud Firestore Database. If necessary, I can create a Node + Express Rest API with Mongo to replicate the same results (which, if I end up having enough time, plan on doing regardless). In any case, the data in Firestore has been organized in the following manner:

| collection     | fields  | 
| -------------- | ------- | 
| vehiclemake    |   name, logo, headquarters, founded, abbreviation, description     |  
| vehiclemodel   |   name, abbreviation, image, productionStart, makeId      |   

+ The makeId field functions as a foreign key in Firestore, although the data could have probably been more neatly organized if I had included the models as an array of objects for each manufacturer. I have included some fields which were technically not required, simply in order to make the site more visually appealing by providing more data.

+ One of the requirements was to give users the ability to edit documents in the database. This I have only included for the production start year because it doesn't make sense for the user to be able to modify the name, image or anything else really. That is one of the reasons why I have even included the production start field in the database. Furthermore, this same field is used when sorting models from oldest to newest (otherwise I'm not sure by which criteria I could have sorted them).

+ Additionally, one of the requirements was to use mobX for global state management. Having never used mobX or redux, the main branch only contains the native React context management tools - createContext and useContext - which I have some experience with. There is / will be a separate mobX branch where I will attempt to replicate everything I've done using mobX.

__That's about it! I hope I've at least met some criteria. Thank you for your time. If you have any questions, feel free to contact me.__

