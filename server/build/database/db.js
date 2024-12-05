"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTable = userTable;
exports.subjectTable = subjectTable;
exports.topicTable = topicTable;
exports.rankTable = rankTable;
exports.durationTable = durationTable;
exports.createTables = createTables;
const postgres_1 = __importDefault(require("postgres"));
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
    const sql = (0, postgres_1.default)({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
        idle_timeout: 60000,
        transform: postgres_1.default.camel,
        ssl: true
    });
    return sql;
})();
// host: /*"localhost",*/ process.env.POSTGRES_HOST,
// user: /*"postgres",*/ process.env.POSTGRES_USER,
// database: /*"elearning"*/ process.env.POSTGRES_DB,
// password: /*"root",*/process.env.POSTGRES_PASSWORD,
// port: 5432,
// idle_timeout: 60000,
// transform: postgres.camel
function userTable(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL,role TEXT NOT NULL, first_name TEXT NULL, last_name TEXT NULL)`;
        }
        catch (error) {
            console.log(`creating ${table} failed`);
            console.log(error.message);
        }
    });
}
function subjectTable(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, name TEXT NOT NULL)`;
        }
        catch (error) {
            console.log(`creating ${table} failed`);
            console.log(error.message);
        }
    });
}
function topicTable(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //     await sql`CREATE TABLE IF NOT EXISTS ${sql(table)}(id SERIAL PRIMARY KEY, CONSTRAINT fk_author_bookstore
            //   FOREIGN KEY(userid) 
            //   REFERENCES users(id), email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, first_name TEXT NULL, last_name TEXT NULL)`
            yield sql `CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, title TEXT NOT NULL, video TEXT NOT NULL, description TEXT NOT NULL, subjectId INTEGER NOT NULL references subjects(id))`;
        }
        catch (error) {
            console.log(`creating ${table} failed`);
            console.log(error.message);
        }
    });
}
function rankTable(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, completed BOOLEAN NOT NULL, rate INTEGER NOT NULL, topicscompleted INTEGER [], topicsCount INTEGER NOT NULL , userId INTEGER NOT NULL references users(id), subjectId INTEGER NOT NULL references subjects(id))`;
        }
        catch (error) {
            console.log(`creating ${table} failed`);
            console.log(error);
        }
    });
}
function durationTable(table) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sql `CREATE TABLE IF NOT EXISTS ${sql(table)} (id SERIAL PRIMARY KEY, completed BOOLEAN NOT NULL, rate TEXT NOT NULL, subjectId INTEGER NOT NULL references subjects(id), topicId INTEGER NOT NULL references topics(id), userId INTEGER NOT NULL references users(id))`;
        }
        catch (error) {
            console.log(`creating ${table} failed`);
            console.log(error);
        }
    });
}
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield userTable("users");
            yield subjectTable("subjects");
            yield topicTable("topics");
            yield rankTable("ranks");
            yield durationTable("durations");
        }
        catch (error) {
        }
    });
}
exports.default = sql;
