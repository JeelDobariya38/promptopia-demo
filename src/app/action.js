'use server';

import prisma from "@lib/prisma";
import { redirect } from "next/navigation";


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


export async function createPostForm(formData) {
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
        redirect(`/posts/${updatedPost.id}`);
    }

    redirect("/");
}


export async function deletePostForm(formData) {
    let id = formData.get("postid");

    await prisma.posts.delete({
        where: {
            id,
        },
    });

    redirect("/");
}
