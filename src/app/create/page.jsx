import { SubmitButton } from '@components/submitbutton';
import { redirect } from 'next/navigation';
// import { savePost } from '@utils/db';

async function createPost(formData) {
    "use server";

    let name = formData.get('name');
    let email = formData.get('email');
    let prompt = formData.get('prompt');
    let tags = formData.get('tags');

    // savePost(name, email, prompt, tags);

    redirect("/");
}

export default function Create() {
    return (
        <section className="md:w-1/2 w-full">
            <div className="sm:text-4xl w-full mt-5 text-2xl font-black">
                <h1 className="text-orange-500 red_bule_gradient">Create Prompt Post</h1>
                <p className="sm:text-lg sm:font-bold text-sm font-thin text-gray-600">Contribute a good little AI prompt</p>
            </div>

            <div className="my-5 p-4 rounded-4xl bg-slate-800">
                <form className="flex flex-col gap-3 sm:text-lg text-sm" action={createPost}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" placeholder="Full Name" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" placeholder="example@gmail.com" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" />
                    </div>

                    <div>
                        <label htmlFor="prompt">Prompt:</label>
                        <textarea id="prompt" name="prompt" placeholder="Enter your prompt" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" />
                    </div>

                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <textarea id="tags" name="tags" placeholder="#enter #hashtags #releated #to #your #prompts" className="w-full my-1 p-1 rounded outline-2 focus:outline-orange-600" />
                    </div>

                    <SubmitButton value="Create Prompt Post" />
                </form>
            </div>
        </section>
    )
}
