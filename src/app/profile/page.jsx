import { getUserById } from "@app/auth/authController";
import { getUserID } from "@lib/session";

export const metadata = {
  title: "Profile | Promptopia",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  let userId = await getUserID();
  let user = await getUserById(userId);
  return (
    <section className="preserve-lines">
      {JSON.stringify(user, null, 2)}
    </section>
  );
}
