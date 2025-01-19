"use client";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    return (
        <div>
            <input value={email} type="text" placeholder="emailid" onChange={(e) => {
                setEmail(e.target.value);
            }}/>
            <input value={password} type="password" placeholder="password" onChange={((e) => {
                setPassword(e.target.value);
            })}/>
            <button onClick={async () => {
                try{
                    const resp = await axios.post(`${BACKEND_URL}/auth/signin`, {
                        email: email,
                        password: password
                    })
                    console.log(resp)
                    // set the token in localStorage
                    localStorage.setItem("token", resp.data.token);
                    router.push("/");
                } catch(err) {
                    alert("Error signing in");
                }
            }}>SignIn</button>

        </div>
    )
}