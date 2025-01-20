"use client";

import { Button } from "@repo/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
//import { Label } from "@repo/ui/label";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../../../config";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    // console.log("Form submitted:", formData);
    try{
        const resp = await axios.post(`${BACKEND_URL}/auth/signup`, {
            email: formData.email,
            password: formData.password,
            name: formData.name
        })
        router.push("/signin")
    } catch(err) {
        alert("Error signing up");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <UserPlus className="h-10 w-10 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* <Label htmlFor="name">Full Name</Label> */}
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="email">Email</Label> */}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="password">Password</Label> */}
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}