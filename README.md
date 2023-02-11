# The-Dealership (Mono Software application)
Project started on 31 Jan using Vite as the build tool. Use either __mobx+node__ branch or __mobx__ branch (the main branch is lagging behind and precedes mobx implementation; mobx+node uses my own API (Express + Mongo) and has backend pagination and sorting, whereas mobx branch uses Firebase and has frontend pagination and sorting). To view the application in action run:
```terminal
npm install
npm run dev
```
... or visit the Netlify website where the app has been deployed: [The Dealership](https://barjaktarevic-the-dealership-node.netlify.app/ "Click to visit.")

__NOTE THAT THE API FOR THE WEBSITE IS HOSTED ON RENDER.COM ON THE FREE PLAN, WHICH MEANS IT MIGHT TAKE AROUND 30-45 SECONDS FOR IT TO BECOME AVAILABLE AGAIN AFTER A PERIOD OF DISUSE.__

The site is fully responsive so you can view it on mobile devices as well.

This branch uses an API I've made using Express, which you can also view on the following link and learn more about the available endpoints: [The Dealership API Github Link](https://github.com/Barjaktarevic/the-dealership-api "Click to visit and learn about the endpoints.")


## Notes about the project
+ For data storage I'm using Mongo Atlas. The data has been organized in the following manner:

| collection     | fields  | 
| -------------- | ------- | 
| vehiclemake    |   name, logo, headquarters, founded, abbreviation, description     |  
| vehiclemodel   |   name, abbreviation, image, productionStart, makeId      |   

+ Two other bonus features I've included are the ability to add cars to favorites (saves to Local Storage) and a video gallery.

+ For CSS I've used Tailwind with some custom classes for fancy image effects / hamburger menu - which I've taken from previous projects of mine.

+ One of the requirements was to give users the ability to edit documents in the database. This I have only included for the production start year because it doesn't make sense for the user to be able to modify the name, image or anything else really. That is one of the reasons why I have even included the production start field in the database. Furthermore, this same field is used when sorting models from oldest to newest (otherwise I'm not sure by which criteria I could have sorted them).

+ Additionally, one of the requirements was to use mobX for global state management. Having never used mobX, and it being difficult to find non-trivial, in-depth tutorials for it online, I've done my best and stuck to the basics. Hopefully, I've followed at least some best practices. The main branch relies on useState / createContext & useContext instead (but, to reiterate, the main branch has fewer features and should not be reviewed). 

That's about it. If I need to make any changes or redo the project completely, feel free to contact me. Thank you for your time.

