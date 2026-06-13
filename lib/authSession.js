import crypto from "crypto";
import db from "./db";
import { cookies } from "next/headers";

export async function createAuthSession(userId) {
  const expireInterval = 60 * 60 * 24 * 1000;
  const expireTime = Date.now() + expireInterval;
  const sessionId = crypto.randomBytes(25).toString("base64url");
  //   یک آرایه ۲۵ بایتی از داده‌های تصادفی واقعی (کریپتوگرافیک) تولید می‌کند
  //   این قسمت داده‌های باینری را تبدیل می‌کند به یک رشته قابل خواندن.
  // چرا تبدیل به base64url
  //   فقط شامل حروف، اعداد، _ و - است
  // داخل URL مشکلی ندارد
  // داخل Cookie مشکلی ایجاد نمی‌کند
  // خطر برخورد کاراکترهای خطرناک را ندارد
  const session = db
    .prepare(`insert into session (id, expires_at, user_id) values (?,?,?)`)
    .run(sessionId, expireTime, userId);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "sessionNAMEalireza",
    value: sessionId,
    httpOnly: true,
    sameSite: "lax",
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    expires: new Date(expireTime),
    path: "/",
  });
  return;
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionNAMEalireza")?.value;
  if (!sessionId) {
    return null;
  }
  const session = db.prepare(`select * from session where id=?`).get(sessionId);
  if (!session) {
    return null;
  }
  if (session.expires_at < Date.now()) {
    db.prepare(`delete from session where id=?`).run(sessionId);
    cookieStore.delete("sessionNAMEalireza");
    return null;
  }
  // console.log(session);
  const user = db
    .prepare(`select * from users where id=?`)
    .get(session.user_id);

  return user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionNAMEalireza")?.value;

  if (!sessionId) {
    return;
  }
  // حذف از جدول Session
  db.prepare(`DELETE FROM session WHERE id = ?`).run(sessionId);
  // حذف از جدول کوکی مرورگر
  cookieStore.delete("sessionNAMEalireza");

  return;
}
