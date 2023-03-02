# The-Dealership (Mono Software application)
Project started on 31 Jan using Vite as the build tool. Use only this branch (the main branch is lagging behind and precedes mobx implementation; mobx branch lacks some CRUD operations and Cypress tests). To view the application in action run:
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

+ v1.1.0 also includes Cypress testing. After running `npm install`, and starting the development server using `npm run dev`, start up Cypress by running `npx cypress open`. There are four different user journeys that you can test that test CRUD operations, adding and removing models from favorites, testing flash messages and testing the mobile user experience.

That's about it. If I need to make any changes or redo the project completely, feel free to contact me. Thank you for your time.
