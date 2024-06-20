# Personal Task Manager
An example of a Next.js task manager project that can perform all non-optional tasks listed below.

### Technologies Used
Next.js, Tailwind CSS, Radix UI, MySQL, Prisma

### Requirements
The Personal Task Manager requires Python (or Python 3 for Mac). To download, please follow this link: https://www.python.org/downloads/

### Run the Program
To run the Personal Task Manager program on your local device:
1. Clone the github repo to your IDE (I personally use VSCode)
2. Ensure that MySQL is active by running the following in the terminal: `sudo /usr/local/mysql/support-files/mysql.server start`
3. Run `npx prisma migrate dev` to ensure the DB is in sync with the schema
4. In the terminal, run `npm run dev`
This should open up the application, likely on port localhost:3000, unless this port is already in use

### Usage Instructions
Once you have the applicaiton running on your local device, play around on it. Create tasks, delete tasks, update project, see how the components change and interact.
As of now, this is V1 and contains known bugs that do not hinder the functionality. I am exploring other projects and technologies before squashing the bugs!

### FINAL PROJECT 
## V1:
[{Loom demo}](https://www.loom.com/share/87481db15eb14eb49e943609f9a55567?sid=800c265e-328b-42d0-b6b6-5167f2ca8488)
<br />
## V2:
[{Loom demo}](https://www.loom.com/share/6890d2cfe03642c8bc5edf65f4c0dff9?sid=12d30c7d-d8a7-480a-92f2-b56c11f2d99e)

<br />
<br />
<br />

### Joy of Coding Solo Internship Project

A solo project will help you apply your knowledge of React or Next.js, along with the tools you've learned (Tailwind CSS, Radix UI, and Prisma) and is a great way to transition into client projects on the internship.

We are so excited for you to be on these projects!

We ask that you create a Personal Task Manager Application. This project will help you manage your tasks, and it can serve as an excellent learning experience.

<h4>Project Description:</h4>

_Why:_ 

As a staff we want to see how you approach a problem, how you design a solution, and your flair for implementation. To be able to break down features into code will be vital as a six figure developer.
 
 
_What we are looking for:_
Create a web application that allows users to add, edit, and delete personal tasks. Here are the key features:

- **Task List:** Display a list of tasks, including the task name, description, and due date.
- **Task Creation:** Implement a feature to add new tasks, with fields for task name, description, and due date.
- **Task Editing:** Allow users to edit task details such as the name, description, and due date.
- **Task Deletion:** Enable users to delete tasks they no longer need.
- **Task Organization:** Implement task organization or filtering options, such as sorting by due date or categorizing tasks.
- **User Authentication (optional bonus points):** Add user registration and authentication to allow multiple users to manage their personal tasks.
- **Double Optional:** Build in the following features -- 
   1. An issue summary (chart showing number of issues by type (open, in progress, or closed)
   2. Launch a demo of the app using vercel
   3. Present different user selected color options (and save the options for the next time the user logs in)


_Tech Stack:_

You can choose either React or Next.js as your framework. Utilize Tailwind CSS for styling to ensure a clean and modern interface. For user interface components, leverage Radix UI for accessibility and a polished look. Set up a mySql or Postgres database, using Prisma like you learned in the last Mosh tutorial. Prisma will come in handy for managing the database and storing task data.

This project will give you an opportunity to apply your knowledge and encourage you to explore new concepts such as user authentication, state management, and more. It's a practical way to create something useful while continuing to expand your web development skills. Happy coding, and have fun building your Personal Task Manager!
