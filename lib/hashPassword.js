import crypto from "node:crypto";
export function hashNewPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPass = crypto.scryptSync(password, salt, 64);
  return hashedPass.toString("hex") + ":" + salt;
}

export function verifyPassword(enteredPassword, correctPassword) {
  if (!correctPassword || !correctPassword.includes(":")) {
    console.error("Invalid password hash format:", correctPassword);
    return false;
  }
  // console.log("correctPassword:", correctPassword);
  const [hashedPassword, salt] = correctPassword.split(":");
  const hashedPassBuffered = Buffer.from(hashedPassword, "hex");
  const hashedEnteredPass = crypto.scryptSync(enteredPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPassBuffered, hashedEnteredPass);
}
