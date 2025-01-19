"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState, useEffect } from "react";


export default function Home() {
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      alert("routing to signin");
      router.push("/signin");
    }
  }, [router]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
       }}>
      {localStorage.getItem("token") !== null && <div>
        <input style={{padding: 10}} value={roomSlug} type="text" placeholder="Room slug" onChange={(e) => {
          setRoomSlug(e.target.value);
        }}/>
        <button style={{padding: 10}} onClick={() =>
          router.push(`/room/${roomSlug}`)
        }>Join Room</button>
      </div>}
      
    
    </div>
  );
}

