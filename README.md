# ridesharing-api
Demo API for ridesharing app
### Requirements
---
We will need `nodejs`, `npm`(comes bundled with nodejs) and `mongodb`. 
Before Setting up we will need these node packages:
1. `express`
2. `mongoose`
### Setting Up and Testing
---
After installing the above, to start mongodb server, run `mongod`. To use mongodb command line use `mongo --host 127.0.0.1:27017`. 
Start the application using : `npm start`
### End Points:
---
These are the working endpoints: 
-  http://localhost:3000/signup [`post`] 
**args**: `fullname, username, email, password` (if driver is signing up => *is_driver, car_no*)
- http://localhost:3000/signin [`put`] 
**args**: `username, password`
- http://localhost:3000/signout [`put`]
**args**: `username, session_key`
- http://localhost:3000/req_ride [`post`]
**args**: `username, session_key, x_start, y_start, x_end, y_end` (*x = latitude, y = longitude*)
- http://localhost:3000/accept_ride [`put`]
**args**: `username, session_key` (*username will be the username of driver, it's equal to the ride_no assigned in the last step*)
- http://localhost:3000/start_ride [`put`]
**args**: `username, session_key` (*username will be the username of driver, it's equal to the ride_no assigned in the last step*)
- http://localhost:3000/complete_ride [`put`]
**args**: `username, session_key` (*username will be the username of driver, it's equal to the ride_no assigned in the last step*)
- http://localhost:3000/status/username [`get`]
**args**: `username`