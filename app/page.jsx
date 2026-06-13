import AuthForm from "@/components/AuthForm";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const mode = params.mode || "login";
  return (
    <main className="bg-gray-500 ">
      <AuthForm mode={mode} />
    </main>
  );
}
