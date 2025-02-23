"use client";

import { UserService } from "@/actions/user.actions";
import { UserDataForm } from "@/interfaces/User/user.interface";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { HiMail } from "react-icons/hi";

export default function Home() {
  const [userData, setUserData] = useState<UserDataForm>({
    email: "",
    password: "",
  });
  const [typeForm, setTypeForm] = useState<string>("Login");
  const [seePasword, setSeePassword] = useState<boolean>(false);
  const { LoginUser, RegisterUser } = UserService();
  const router = useRouter();

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

    //Si el tipo de Formulario es Register ejecuta la función de Registro de Usuario, por el contrario, ejecutará la del Login de Usuario
    if (typeForm === "Register") {
      RegisterUser(userData);
    } else {
      LoginUser(userData).then(() => router.push("/dashboard"));
    }
  };

  return (
    <main className="w-screen h-screen flex">
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6 p-6">
        <h1 className="text-4xl font-bold">{typeForm}</h1>
        <form
          className="flex w-full lg:w-1/2 flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@flowbite.com"
              icon={HiMail}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block flex justify-between">
              <Label htmlFor="password" value="Your password" />
              <span
                className="text-xs text-blue-400 cursor-pointer"
                onClick={() => setSeePassword(!seePasword)}
              >
                {seePasword ? "Hidden Password" : "Show password"}
              </span>
            </div>
            <TextInput
              id="password"
              name="password"
              type={seePasword ? "text" : "password"}
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
        className="w-1/2 hidden lg:flex"
        style={{
          backgroundImage:
            typeForm === "Register"
              ? "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
              : "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,253,142,1) 100%)",
        }}
      ></section>
    </main>
  );
}
