import React from "react"
import { useState } from "react"
import { BottomWarning } from "../components/ButtomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ErrorCredentials } from "../components/ErrorCredentials"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSignUp = async () => {
        try {
          const response = await axios.post("https://rupiya-backend.onrender.com/signup", {
            firstName,
            lastName,
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
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="your first Name" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="your last name " label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="youremail@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="min 8 characters" label={"Password"} />
        <div className="pt-4">
        <Button onClick={handleSignUp}label={"Sign up"} />
        </div>
        {error && <ErrorCredentials />}
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}