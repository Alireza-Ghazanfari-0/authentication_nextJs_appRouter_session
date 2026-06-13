import db from "@/lib/db";

export function createUser(email, password) {
  const result = db
    .prepare(
      `insert into users (email,password) 
    values (?,?)`
    )
    .run(email, password);
  return result.lastInsertRowid;
}

export function getUser(email) {
  return db.prepare(`select * from users where email = ?`).get(email);
}
