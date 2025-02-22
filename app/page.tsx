"use client";

import { userService } from "@/actions/user.actions";
import { UserDataForm } from "@/interfaces/User/user.interface";
import { Button, Label, TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<UserDataForm>({
    email: "",
    password: "",
  });
  const [typeForm, setTypeForm] = useState<string>("Login");

  const { LoginUser, RegisterUser } = userService();

  //Función encargada de cambiar el state de userData según el nombre de su input
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event) return undefined;

    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  //Función encargada de mandar los datos al action de autorización
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeForm === "Register") {
      RegisterUser(userData);
    } else {
      LoginUser(userData);
    }
  };

  return (
    <main className="w-screen h-screen flex">
      <section className="w-1/2 flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold">{typeForm}</h1>
        <form className="flex w-1/2 flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@flowbite.com"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-end px-2 cursor-pointer">
            {typeForm === "Login" ? (
              <span
                className="text-blue-500 font-bold text-sm text-rigth"
                onClick={() => setTypeForm("Register")}
              >
                Register Here!
              </span>
            ) : (
              <span
                className="text-blue-500 font-bold text-sm text-rigth"
                onClick={() => setTypeForm("Login")}
              >
                Do you have an account? | Log in!
              </span>
            )}
          </div>
          <Button type="submit" color="blue">
            Submit
          </Button>
        </form>
      </section>
      <section
        className="w-1/2"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,253,142,1) 100%)",
        }}
      ></section>
    </main>
  );
}
