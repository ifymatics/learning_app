import postgres from "postgres";

// const sql = (() => {
//     const sql = postgres({
//         host: "database-1.cveuycwg68mz.eu-west-2.rds.amazonaws.com",//process.env.POSTGRES_HOST,
//         user: "postgres",//process.env.POSTGRES_USER,
//         database: "elearning",//process.env.POSTGRES_DB,
//         password: "ChInomso0620",//process.env.POSTGRES_PASSWORD,
//         port: 5432,
//         idle_timeout: 60000,
//         ssl: true,
//         transform: postgres.camel
//     });
//     return sql
// })()
const sql = (() => {
    const sql = postgres({
        host: "localhost", //process.env.POSTGRES_HOST,
        user: "postgres",//process.env.POSTGRES_USER,
        database: "elearning",//process.env.POSTGRES_DB,
        password: "root",//process.env.POSTGRES_PASSWORD,
        port: 5432,
        idle_timeout: 60000,
        transform: postgres.camel,



    });
    return sql
})()
// host: /*"localhost",*/ process.env.POSTGRES_HOST,
// user: /*"postgres",*/ process.env.POSTGRES_USER,
// database: /*"elearning"*/ process.env.POSTGRES_DB,
// password: /*"root",*/process.env.POSTGRES_PASSWORD,
// port: 5432,
// idle_timeout: 60000,
// transform: postgres.camel


export async function userTable(table: string) {
    try {


        await sql`CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL,role TEXT NOT NULL, first_name TEXT NULL, last_name TEXT NULL)`;
    } catch (error: any) {
        console.log(`creating ${table} failed`)
        console.log(error.message)
    }


}
export async function subjectTable(table: string) {
    try {


        await sql`CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, name TEXT NOT NULL)`;
    } catch (error: any) {
        console.log(`creating ${table} failed`)
        console.log(error.message)
    }


}
export async function topicTable(table: string) {
    try {

        //     await sql`CREATE TABLE IF NOT EXISTS ${sql(table)}(id SERIAL PRIMARY KEY, CONSTRAINT fk_author_bookstore
        //   FOREIGN KEY(userid) 
        //   REFERENCES users(id), email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, first_name TEXT NULL, last_name TEXT NULL)`
        await sql`CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, title TEXT NOT NULL, video TEXT NOT NULL, description TEXT NOT NULL, subjectId INTEGER NOT NULL references subjects(id))`;
    } catch (error: any) {
        console.log(`creating ${table} failed`)
        console.log(error.message)
    }


}
export async function rankTable(table: string) {
    try {


        await sql`CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, completed BOOLEAN NOT NULL, rate INTEGER NOT NULL, topicscompleted INTEGER [], topicsCount INTEGER NOT NULL , userId INTEGER NOT NULL references users(id), subjectId INTEGER NOT NULL references subjects(id))`;
    } catch (error: any) {
        console.log(`creating ${table} failed`)
        console.log(error)
    }


}

export async function durationTable(table: string) {
    try {


        await sql`CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, completed BOOLEAN NOT NULL, rate TEXT NOT NULL, subjectId INTEGER NOT NULL references subjects(id), topicId INTEGER NOT NULL references topics(id), userId INTEGER NOT NULL references users(id))`;
    } catch (error: any) {
        console.log(`creating ${table} failed`)
        console.log(error)
    }


}
export async function createTables() {
    try {
        await userTable("users");
        await subjectTable("subjects");
        await topicTable("topics");
        await rankTable("ranks");
        await durationTable("durations")
    } catch (error) {

    }
}
export default sql