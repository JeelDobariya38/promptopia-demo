'use server';

import prisma from "@lib/prisma";
import { redirect } from "next/navigation";


export async function createPost(formData) {
    let title = formData.get('title');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    if (title && prompt && tags) {
        const post = await prisma.posts.create({
            data: {
                title,
                prompt,
                tags
            },
        });

        redirect(`/posts/${post.id}`);
    } else {
        redirect("/create");
    }
}


export async function getPosts() {
    let posts = await prisma.posts.findMany();
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


export async function updatePost(id, post) {
    const updatedPost = await prisma.user.update({
        where: {
            id,
        },
        data: {
            title: post.title,
            prompt: post.prompt,
            tags: post.tags
        },
    })

    return updatedPost;
}


export async function deletePost(id) {
    const deletedPost = await prisma.posts.delete({
        where: {
            id,
        },
    });

    return deletedPost;
}
