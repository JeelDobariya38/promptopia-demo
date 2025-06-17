import Image from "next/image";

export default function Navbar() {
    return <>
        <div>
            <h1>Promptopia</h1>
        </div>
        <div>
            <Image
                src="/profile.png"
                alt="profile picture"
                width={50}
                height={50}
                className="rounded-full"
            />
        </div>
    </>;
}
