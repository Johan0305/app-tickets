"use client";
import { UserService } from "@/actions/user.actions";
import { Button, MegaMenu, Navbar } from "flowbite-react";
import React, { ReactNode, useEffect } from "react";
import { MdTask } from "react-icons/md";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { GetCurrentUser, LogOutUser } = UserService();

  useEffect(() => {
    GetCurrentUser();
  }, []);

  //Función para cerrar la sesión actual
  const HandleLogout = () => {
    LogOutUser();
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
          <div className="order-2 hidden items-center md:flex">
            <Button color="failure" onClick={HandleLogout}>
              Log out
            </Button>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#">Dashboard</Navbar.Link>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
      <div className="w-2/3 pt-10">{children}</div>
    </div>
  );
};

export default Layout;
