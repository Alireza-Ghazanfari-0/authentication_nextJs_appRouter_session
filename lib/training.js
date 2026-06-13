import db from "./db";

export async function getTraining(userId) {
  const trainingItems = db
    .prepare(`select * from trainings where user_id = ?`)
    .all(Number(userId));
  const trainingItems2 = db.prepare(`select * from trainings`).all();
  // *****for checking work correctly, if user first or second enter, different sports appear. otherwise, all sports apper
  const items = userId < 3 ? trainingItems : trainingItems2;
  return items;
}
