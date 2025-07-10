'use server';

import prisma from "@/lib/prisma";
import { getUserID } from "@/lib/session";
import { redirect } from "next/navigation";


export async function getPosts(limit) {
    let posts = await prisma.post.findMany({
        skip: 0,
        take: limit,
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return posts;
}


export async function getPost(id) {
    let post = await prisma.post.findFirst({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });

    return post;
}

// export async function getPostsByTags(searchString) {
//     if (!searchString) {
//         return await prisma.post.findMany({
//             include: {
//                 author: true,
//             },
//         });
//     }

//     const posts = await prisma.post.findMany({
//         where: {
//             OR: [
//                 {
//                     prompt: {
//                         contains: searchString,
//                     },
//                 },
//                 {
//                     tags: {
//                         contains: searchString,
//                     },
//                 },
//             ],
//         },
//         include: {
//             author: true,
//         },
//     });

//     return posts;
// }

export async function createPostForm(formData) {
    let usersId = await getUserID();
    let title = formData.get('title');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    if (title && prompt && tags) {
        const post = await prisma.post.create({
            data: {
                title,
                prompt,
                tags,
                author: {
                    connect: {
                        id: usersId
                    }
                },
            }
        });

        return redirect(`/posts/${post.id}`);
    } else {
        return redirect("/create");
    }
}


export async function updatePostForm(formData) {
    let id = formData.get("postid");
    let title = formData.get('title');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    const updatedPost = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            prompt,
            tags
        },
    });

    if (updatedPost) {
        return redirect(`/posts/${updatedPost.id}`);
    }

    return redirect("/");
}


export async function deletePostForm(formData) {
    let id = formData.get("postid");
    let post = await getPost(id);
    let currUserID = await getUserID();

    if (post.userId != currUserID) {
        return redirect(`/posts/${id}`);
    }

    await prisma.post.delete({
        where: {
            id,
        },
    });

    return redirect("/");
}
