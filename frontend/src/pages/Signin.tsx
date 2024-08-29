import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/ButtomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { ErrorCredentials } from "../components/ErrorCredentials"

export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSignIn = async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,
            password
          });
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } catch (error) {
          // Set error message if the request fails
          setError("Wrong credentials");
          
        }
      };



    return <div className="bg-neutral-900 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-max text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="youremail@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="min 8 characters" label={"Password"} />
        <div className="pt-4">
            
                <Button onClick={handleSignIn} label={"Sign in"} />
        </div>
        {error && <ErrorCredentials />}
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}