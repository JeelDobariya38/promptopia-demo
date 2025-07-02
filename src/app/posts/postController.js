'use server';

import prisma from "@lib/prisma";
import { getUserID } from "@lib/session";
import { permanentRedirect, redirect } from "next/navigation";


export async function getPosts(limit) {
    let posts = await prisma.posts.findMany({
        skip: 0,
        take: limit,
        include: {
            author: true,
        },
    });

    return posts;
}


export async function getPost(id) {
    let post = await prisma.posts.findFirst({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });

    return post;
}

export async function getPostsByTags(searchString) {
    if (!searchString) {
        return await prisma.posts.findMany();
    }

    const posts = await prisma.posts.findMany({
        where: {
            OR: [
                {
                    prompt: {
                        contains: searchString,
                        // mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        contains: searchString,
                        // mode: 'insensitive',
                    },
                },
            ],
        },
        include: {
            author: true,
        },
    });

    return posts;
}

export async function createPostForm(formData) {
    let usersId = await getUserID();
    let title = formData.get('title');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    if (title && prompt && tags) {
        const post = await prisma.posts.create({
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

        return permanentRedirect(`/posts/${post.id}`);
    } else {
        return permanentRedirect("/create");
    }
}


export async function updatePostForm(formData) {
    let id = formData.get("postid");
    let title = formData.get('title');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    const updatedPost = await prisma.posts.update({
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
        return permanentRedirect(`/posts/${updatedPost.id}`);
    }

    return permanentRedirect("/");
}


export async function deletePostForm(formData) {
    let id = formData.get("postid");
    let post = await getPost(id);
    let currUserID = await getUserID();

    if (post.userId != currUserID) {
        return redirect(`/posts/${id}`);
    }

    await prisma.posts.delete({
        where: {
            id,
        },
    });

    return permanentRedirect("/");
}
