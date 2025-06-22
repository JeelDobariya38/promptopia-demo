import prisma from "@lib/prisma";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const queryid = searchParams.get("id");

    if (queryid) {
        let post = await prisma.posts.findFirst({
            where: {
                id: queryid,
            },
        });

        if (post) {
            let response = {
                "data": post,
                "success": true
            }

            return new Response(JSON.stringify(response), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let response = {
            "message": "post not found!!",
            "success": false
        };

        return new Response(JSON.stringify(response), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let posts = await prisma.posts.findMany();

    let response = {
        "data": posts,
        "success": true
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
