Hello Everyone 👋,

I've dedicated time to enhance my skills by creating this project, which includes both front-end and server-side programming. While the project is complete, some functionalities are yet to be added.

How to Use This Application
Firebase Account Setup:

Create a Firebase account and project.
Enable authentication for the project.
Configuration Setup:

Open .env.local file.

Add the boilerplate code information found in client/src/firebase/firebase.config.js:

javascript
import.meta.env.VITE_APIKEY
Save the details in your .env file like this:

env
VITE_APIKEY=your_info
MongoDB Setup:

Have a MongoDB account.
Include your connection URI in the environment variables.
User Collection Setup:

In your MongoDB server, under the users collection, set admin:true for at least one user. This user can then be used to create more admins.
Features Available
User Verification: JWT is used for user verification.
Authentication: Firebase is employed for user authentication.
Admin Verification: Only admins have the ability to add and modify information.
Request for Feedback
As a passionate developer, I'm eager to improve my skills. If you find any bugs in the code or if there are areas that can be enhanced, please let me know.

Thank You 🙏,
Happy Coding! 🚀
