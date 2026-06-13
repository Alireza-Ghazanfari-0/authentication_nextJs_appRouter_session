import { verifyAuth } from "@/lib/authSession";
import { getTraining } from "@/lib/training";
import { redirect } from "next/navigation";

export default async function page() {
  // await verifyAuth();
  const authUser = await verifyAuth();
  // console.log(userId);

  if (!authUser) {
    redirect("/?mode=login");
  }

  const trainingItems = await getTraining(authUser.id);

  return (
    <div className="flex p-1">
      {trainingItems.map((item) => (
        <div className="flex flex-col m-2" key={item.id}>
          <div className="text-2xl ps-3.5">{item.title}</div>
          <img className="rounded-lg mt-1.5 mb-1" src={item.image} />
          <div className="bg-slate-400 mt-1 rounded-2xl p-1.5 text-pink-800  text-xl">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}
