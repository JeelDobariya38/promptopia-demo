import Feed from "@components/feed";
import LoadingFeed from "@components/loadingfeed";
import NavigationBar from "@components/navigationbar";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const experimental_ppr = true;

export default async function Home() {
    return (
        <section className="text-center">
            <NavigationBar />

            <Suspense fallback={ <LoadingFeed /> }>
                <Feed />
            </Suspense>
        </section>
    )
}
