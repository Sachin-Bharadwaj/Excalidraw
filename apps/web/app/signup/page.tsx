"use client";
import { useReducer, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    return (
        <div>
            <input value={name} type="text" placeholder="name" onChange={((e) => {
                setName(e.target.value);
            })}/>
            <input value={email} type="text" placeholder="emailid" onChange={(e) => {
                setEmail(e.target.value);
            }}/>
            <input value={password} type="password" placeholder="password" onChange={((e) => {
                setPassword(e.target.value);
            })}/>
            <button onClick={async () => {
                try{
                    const resp = await axios.post(`${BACKEND_URL}/auth/signup`, {
                        email: email,
                        password: password,
                        name: name
                    })
                    router.push("/signin")
                } catch(err) {
                    alert("Error signing up");
                }
            }}>Signup</button>

        </div>
    )
}