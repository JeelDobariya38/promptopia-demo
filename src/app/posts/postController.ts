"use server";

import prisma, { PostWithUser } from "@/lib/prisma";
import { getUserID } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getPosts(
  limit: number | undefined = undefined
): Promise<PostWithUser[]> {
  let posts = await prisma.post.findMany({
    skip: 0,
    take: limit,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export async function getPost(id: string): Promise<PostWithUser | null> {
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

export async function createPostForm(formData: FormData): Promise<void> {
  let usersId: string = await getUserID();
  let title: string | undefined = formData.get("title")?.toString();
  let prompt: string | undefined = formData.get("prompt")?.toString();
  let tags: string | undefined = formData.get("tags")?.toString();

  if (title && prompt && tags) {
    const post = await prisma.post.create({
      data: {
        title: title,
        prompt: prompt,
        tags: tags,
        author: {
          connect: {
            id: usersId,
          },
        },
      },
    });

    return redirect(`/posts/${post.id}`);
  } else {
    return redirect("/create");
  }
}

export async function updatePostForm(formData: FormData): Promise<void> {
  let id: string | undefined = formData.get("postid")?.toString();
  let title: string | undefined = formData.get("title")?.toString();
  let prompt: string | undefined = formData.get("prompt")?.toString();
  let tags: string | undefined = formData.get("tags")?.toString();

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      prompt,
      tags,
    },
  });

  if (updatedPost) {
    return redirect(`/posts/${updatedPost.id}`);
  }

  return redirect("/");
}

export async function deletePostForm(formData: FormData): Promise<void> {
  let id: string | undefined = formData.get("postid")?.toString();

  if (!id) return redirect("/posts");

  let post: PostWithUser | null = await getPost(id);

  if (!post) return redirect("/posts");

  let currUserID: string = await getUserID();

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
