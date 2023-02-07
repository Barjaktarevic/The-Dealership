# The-Dealership (Mono Software application)
Project started on 31 Jan using Vite as the build tool. Use the __mobx__ branch (the main branch is lagging behind and precedes mobx implementation). To view the application in action run:
```terminal
npm install
npm run dev
```
... or visit the Netlify website where the app has been deployed: [The Dealership](https://barjaktarevic.github.io/](https://the-dealership-barjaktarevic.netlify.app/ "Click to visit.")

The site is fully responsive so you can view it on mobile devices as well.

## Notes about the project
+ For data storage I'm using the Cloud Firestore Database. If necessary, I can create a Node + Express Rest API with Mongo to replicate the same results (which, if I end up having enough time, plan on doing regardless). In any case, the data in Firestore has been organized in the following manner:

| collection     | fields  | 
| -------------- | ------- | 
| vehiclemake    |   name, logo, headquarters, founded, abbreviation, description     |  
| vehiclemodel   |   name, abbreviation, image, productionStart, makeId      |   

+ The makeId field functions as a foreign key in Firestore, although the data could have probably been more neatly organized if I had included the models as an array of objects for each manufacturer. I have included some fields which were technically not required, simply in order to make the site more visually appealing by providing more data.

+ Two other bonus features I've included are the ability to add cars to favorites (saves to Local Storage) and a video gallery.

+ For CSS I've used Tailwind with some custom classes for fancy image effects / hamburger menu - which I've taken from previous projects of mine.

+ One of the requirements was to give users the ability to edit documents in the database. This I have only included for the production start year because it doesn't make sense for the user to be able to modify the name, image or anything else really. That is one of the reasons why I have even included the production start field in the database. Furthermore, this same field is used when sorting models from oldest to newest (otherwise I'm not sure by which criteria I could have sorted them).

+ Additionally, one of the requirements was to use mobX for global state management. Having never used mobX, and it being difficult to find non-trivial, in-depth tutorials for it online, I've done my best and stuck to the basics. Hopefully, I've followed at least some best practices. The main branch relies on useState / createContext & useContext instead (but, to reiterate, the main branch has fewer features and should not be reviewed). 

That's about it. If I need to make any changes or redo the project completely, feel free to contact me. Thank you for your time.

