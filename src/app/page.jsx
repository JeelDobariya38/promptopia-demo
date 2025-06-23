import Feed from "@components/feed";
import NavigationBar from "@components/navigationbar";
import prisma from "@lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
    let posts = await prisma.posts.findMany();

    return (
        <section className="text-center">
            <NavigationBar />
            <Feed posts={ posts }/>
        </section>
    )
}
