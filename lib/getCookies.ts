"use server";

import { cookies } from "next/headers";

//funcion encargada del llamado de las cookies dependiendo el valor que se almacene

export const getCookies = async (
  nameCookie: string
): Promise<string | undefined> => {
  const cookie = await cookies();
  const cookieRequest = cookie.get(nameCookie)?.value;

  return cookieRequest;
};

export const setCookies = async (
  nameCookie: string,
  value: string
): Promise<void> => {
  const cookie = await cookies();
  cookie.set(nameCookie, value);
};

export const deleteCookies = async (
  nameCookie: string
): Promise<string | undefined> => {
  const cookie = await cookies();
  const cookieRequest = cookie.get(nameCookie)?.value;

  return cookieRequest;
};
