"use server";

import { createAuthSession, destroySession } from "@/lib/authSession";
import { hashNewPassword, verifyPassword } from "@/lib/hashPassword";
import { createUser, getUser } from "@/lib/users";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = { error: [] };

  if (!email || !email.includes("@")) {
    errors.error.push("Enter valid email address");
  }
  if (!password || password.length < 6) {
    errors.error.push("Enter valid password");
  }
  if (errors.error.length > 0) {
    return errors;
  }

  const resultUser = getUser(email);
  if (!resultUser) {
    errors.error.push("There is no account with that email address.");
    return errors;
  }
  const isValidateAccountPass = verifyPassword(password, resultUser.password);
  if (!isValidateAccountPass) {
    errors.error.push("Incorrect Password.");
    return errors;
  }

  if (isValidateAccountPass) {
    await createAuthSession(resultUser.id);
    redirect("/trainings");
  }
}

export async function signup(prevState, formData) {
  // console.log(prevState);

  const email = formData.get("email");
  const password = formData.get("password");
  let errors = { error: [] };

  if (!email || !email.includes("@")) {
    errors.error.push("Enter valid email address");
  }
  if (!password || password.length < 6) {
    errors.error.push("Enter valid password");
  }
  if (errors.error.length > 0) {
    return errors;
  }

  try {
    const hashedPasswored = hashNewPassword(password);
    const id = createUser(email, hashedPasswored);
    await createAuthSession(id);
    // console.log("aaaaaa");
    redirect("/trainings");
  } catch (error) {
    // console.log(error);
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.error.push("email is duplicate");
      return errors;
    }
    throw error;
  }
}

export async function trigerOperation(mode, prevState, formData) {
  if (mode === "login") {
    return await login(prevState, formData);
  }
  if (mode === "signup") {
    return await signup(prevState, formData);
  }
}

export async function logout() {
  await destroySession();
  redirect("/?mode=login");
}
