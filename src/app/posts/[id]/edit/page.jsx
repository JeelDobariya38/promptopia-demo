import { getPost, updatePostForm } from '@app/action';
import { SubmitButton } from '@components/submitbutton';
import { redirect } from 'next/navigation';


export const metadata = {
    title: "Edit | Promptopia"
};

export const dynamic = 'force-dynamic';

export default async function EditPage({ params }) {
    const { id } = await params;

    let post = await getPost(id);

    if (!post) {
        redirect("/");
    }

    return (
        <section className="md:w-1/2 w-full">
            <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
                <h1 className="text-orange-500 red_bule_gradient">Edit Prompt Post</h1>
                <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-400">Contribute a good little AI prompt</p>
            </div>

            <div className="my-5 p-4 rounded-4xl bg-slate-800">
                <form className="flex flex-col gap-3 sm:text-lg text-sm" action={updatePostForm}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input id="title" name="title" defaultValue={post.title} className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <div>
                        <label htmlFor="prompt">Prompt:</label>
                        <textarea id="prompt" name="prompt" defaultValue={post.prompt} className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <textarea id="tags" name="tags" defaultValue={post.tags} className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" required />
                    </div>

                    <input type='hidden' defaultValue={post.id} name="postid" />
                    <SubmitButton value="Edit Prompt Post" />
                </form>
            </div>
        </section>
    )
}
