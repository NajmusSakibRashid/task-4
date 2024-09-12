'use client'

import { useRouter } from "next/navigation";


export default () => {
    const router = useRouter();
    const clickHandler = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/');
    }
    return (
        <button className="fixed right-0 top-0 m-8 bg-red-700 p-2 rounded-lg min-w-28 text-white hover:bg-red-500 active:bg-red-600" onClick={clickHandler}>
            Logout
        </button>
    );
}