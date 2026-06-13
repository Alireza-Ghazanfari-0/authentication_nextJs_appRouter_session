"use client";
import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trigerOperation } from "@/actions/authActions";

// import { useFormState } from "react-dom";

function AuthForm({ mode }) {
  // console.log(mode);
  const [state, formAction, isPending] = useActionState(
    trigerOperation.bind(null, mode),
    {}
  );
  // const [state, formAction] = useFormState(
  //   trigerOperation.bind(null, mode),
  //   {}
  // );

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto w-sm lg:w-md xl:w-2xl 3xl:w-2xl">
      <form
        action={formAction}
        className="bg-white max-w-[70%] h-120 flex justify-center items-center flex-col rounded-xl"
      >
        <Image
          src={mode == "login" ? "/loginicon.png" : "/signup.jpg"}
          width={350}
          height={60}
          alt="login signup logo"
        />

        <div className="mt-8 w-[95%]">
          <div className="flex flex-col">
            <label htmlFor="email" className="ps-5">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="border border-gray-500 rounded-full mt-1"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="password" className="ps-5">
              Password
            </label>
            <input
              name="password"
              id="password"
              className="border border-gray-500 rounded-full mt-1"
            />
          </div>
        </div>
        <div className="w-full ps-3 pt-3">
          {state &&
            state.error &&
            state.error.length > 0 &&
            state.error.map((er) => (
              <p className="text-red-500 " key={er}>
                {er}
              </p>
            ))}
        </div>

        <div className="flex flex-col items-center mt-4">
          <button
            type="submit"
            className="rounded-full w-[50%] h-8 bg-green-600 text-white cursor-pointer"
            disabled={isPending}
          >
            {mode == "login" ? "Login" : "Signup"}
          </button>
          {mode == "login" ? (
            <Link
              href="/?mode=signup"
              className="mt-3 text-center ms-1.5 me-1.5"
            >
              Dont have an account?! Click here for REGISTER.
            </Link>
          ) : (
            <Link
              href="/?mode=login"
              className="mt-3 text-center ms-1.5 me-1.5 "
            >
              Do you have account?! Click here for LOGIN!
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
