'use server';

import prisma from "@lib/prisma";
import { getUserID } from "@lib/session";
import { permanentRedirect } from "next/navigation";


export async function getPosts(limit) {
    let posts = await prisma.posts.findMany({
        skip: 0,
        take: limit,
    });

    return posts;
}


export async function getPost(id) {
    let post = await prisma.posts.findFirst({
        where: {
            id,
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
                        mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        contains: searchString,
                        mode: 'insensitive',
                    },
                },
            ],
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
            },
        });

        permanentRedirect(`/posts/${post.id}`);
    } else {
        permanentRedirect("/create");
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
        permanentRedirect(`/posts/${updatedPost.id}`);
    }

    permanentRedirect("/");
}


export async function deletePostForm(formData) {
    let id = formData.get("postid");

    await prisma.posts.delete({
        where: {
            id,
        },
    });

    permanentRedirect("/");
}
