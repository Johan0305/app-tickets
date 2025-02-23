"use client";
import { UserService } from "@/actions/user.actions";
import { RootState } from "@/store/store";
import { Button, MegaMenu, Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { MdTask } from "react-icons/md";
import { useSelector } from "react-redux";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { GetCurrentUser, LogOutUser } = UserService();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  //Cuando se recarga la página, se encarga de que traiga los datos del usuario
  useEffect(() => {
    if (!user) {
      GetCurrentUser();
    }
  }, []);

  //Función para cerrar la sesión actual
  const HandleLogout = () => {
    LogOutUser().then(() => router.push("/"));
  };

  return (
    <div className="flex flex-col w-screen items-center gap-6">
      <MegaMenu className="w-full shadow-xl">
        <div className="w-full mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
          <Navbar.Brand href="/">
            <MdTask />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Tappsk
            </span>
          </Navbar.Brand>
          <div className="order-2 items-center md:flex">
            <Button color="failure" size="sm" onClick={HandleLogout}>
              Log out
            </Button>
          </div>
          {/* <Navbar.Toggle /> */}
        </div>
      </MegaMenu>
      <div className="w-full lg:w-2/3 pt-10">{children}</div>
    </div>
  );
};

export default Layout;
