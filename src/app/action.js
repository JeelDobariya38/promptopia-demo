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


export async function getPost(id) {
    let post = await prisma.posts.findFirst({
        where: {
            id,
        },
    });

    return post;
}


export async function getPosts() {
    let posts = await prisma.posts.findMany();
    return posts;
}
