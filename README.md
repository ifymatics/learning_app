## Getting Started

1. cd into server and frontend folders and run the following command respectively

```bash
npm install
```

2. Create .env file using the .env_example file in the server folder

3.cd into server folder and run the development server and frontend using the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Use postman to create an admin user: payload={"email":"example@mail.com", password:"12345", role:"1"}. url: http://localhost:5000/signup

5. Login using http://localhost:3000/login and
   You will be redirected to http://localhost:3000/admin on successful login as an admin user.

6. From the admin page, you will create subjects and topics that belongs to the subjects
7. To sign up as a normal user, visit http://localhost:3000/signup and you will be
   redirected to http://localhost:3000 where you can see subjects to learn.

8. On completion of any subjects, it will be ranks on the admin dashboard based on the time taken to complete all the topics in that subject
