import Database from "better-sqlite3";
const db = new Database("training-database.db");

db.prepare(
  `create table if not exists users(
    id integer primary key,
    email text unique not null, 
    password text
    
)`,
).run();

db.exec(`create table if not exists session(
    id text primary key not null,
    expires_at integer not null,
    user_id text not null,
    foreign key (user_id) references users(id)
    ) `);

// در بالا foreign
// اتصال جدول Session و جدول users بر حسب id

// db.exec(`create table if not exists trainings`);

db.exec(`create table if not exists trainings(
    id integer primary key,
    title text not null,
    image text,
    description text,
    user_id integer not null
    ) `);
//
const hasTrainings =
  db.prepare("SELECT COUNT(*) as count FROM trainings").get().count > 0;

if (!hasTrainings) {
  db.exec(`insert into trainings (title, image, description, user_id)
  values
  ('yoga', 'yoga.jpg', 'a picture from yoga sport', 1),
  ('running', 'running.jpg', 'running sport', 1),
  ('boxing','boxing.jpg','box with friend', 2)
  `);
}

export default db;
