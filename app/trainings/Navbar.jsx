import { logout } from "@/actions/authActions";
import { verifyAuth } from "@/lib/authSession";

async function Navbar() {
  const authUser = await verifyAuth();
  const email = authUser.email;
  //   console.log(authUser);

  return (
    <header className="bg-green-800 h-16 flex flex-row">
      <form action={logout}>
        <button className="bg-white rounded-2xl p-1.5 px-3 hover: cursor-pointer ms-4 mt-2 text-2xl">
          Logout
        </button>
      </form>
      <span className="bg-amber-300 rounded-2xl p-1.5 px-3 ms-4 mt-3 h-10 text-xl">{`User: ${email}`}</span>
    </header>
  );
}

export default Navbar;
