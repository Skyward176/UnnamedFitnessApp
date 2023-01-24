# Unnamed Fitness Website
---

### System Definition:

The problem: Working out is intimidating and mysterious to many. Resources for fitness are often fragmented into many smaller solutions, hidden behind paywalls, or simply not user friendly. Leaving people looking to better themselves to their own devices adds challenge to what is already a difficult but important discipline to develop.

My solution: A website that allows users to create, share, and review routines. Users will also be able to track when they exercised, what routine they performed, how many reps and at what weight they performed them . The app will calculate recommended weights for subsequent workouts based on parameters set by the routine. 

**Objectives(Essential):**
- Login and account system.
- Routine editor.
- Routine search/browse view.
- Routine rating system.

**Objectives(Ideal):**
- Workout log view (view when you've worked out, what routine you did)
- Workout tracker (start a workout, then input your weightxreps as you follow your routine)
- Routine progress (track how far you're into a routine. ex. Week 9/12 or session 10/20);

**Optional/nice to have features:**
- User health data tracking(weight, strength standards, etc.); 
- Social system for copmaring progress to others in weight class.
- WearOS integration: use heartrate to measure intensity, use watch app to input your workout data.
- Ability to monetize routines.
- Exercise tutorial videos.
- Detiled stat analysis of weight gain/loss, weekly exercise volume, and growth.
- Strength metering routines and periodic tracking to measure progress.

### Components

- rocket.rs - API
- rocket-jwt - JWT authorization for Rocket APIs
- MongoDB - Database
- nuxt.js - Frontend
- tailwindCSS - CSS classes 
- Postman - API Testing
- std::env - Env vars for API
- dotenv - Env vars for Frontend
- docker - *optional* Containerize the project

### Development Phases
1. Fit Test: Create ultra-barebones API, frontend, and database to test integration of technologies
2. User table: Create the Database tables for user accounts.
3. User Serializers: Create API views to allow CRUD of Users.
4. User Authorization: Add API ability to generate JWT tokens and authorize requests using them
5. Login frontend: Create frontend page to login a user and send them to dummy homepage.
6. Register frontend: Create registration page to create new users.
7. Navbar: Create site navigation bar. 
8. Exercise table: Create tables and populate with common weight exercises.
9. Exercise serializers: Create views to CRUD exercises. 
10. Routine table: Create Database tables related to Routine creation. 
11. Routine serializers: Create views to CRUD reviews.
12. Routine create frontend: Create view to create a new routine. 
13. Routine list frontend: Create page for viewing list of public routines created by all users.  
14. Routine search frontend: Allow for searching of routines
15. Workout Model/table: Create Models to track instances of working out. Must be associated with routines.
16. Workout Serializer: Create API views for CRUD of workouts. 
17. Workout Editor frotend: Start a workout, then be guided through all exercises in a routine. Prompts for weightsxreps throughout. If first workout of routine, then ask for initial values. Workout controller should be aware of former workouts to dictate weight increases/decreases. These will be based on what is dictated by the routine.    
18. Workout list frontend: Get a list of each time you've worked out, and be able to open workout objects to see how you did. 
19. Homepage Frontend: A homepage that informs you of what workout is due for that day, and also provides access to all other features of the site.
20. User profile frontend: Change your username, contact info, reported weight, age, and other details. 
