"use client";
export function AuthPage({isSignin}: {
    isSignin: boolean;
}) {

    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded">
            <div className="border">
                {!isSignin && <input type="text" placeholder="name"/>}
            </div>
            <div className="border">
                <input type="text" placeholder="email"/>
            </div>
            <div className="border">
                <input type="text" placeholder="password"/>
            </div>
            <div className="border text-black">
                <button onClick={() => {

                }}>{isSignin ? "signin" : "signup"}</button>
            </div>
        </div>

    </div>
}