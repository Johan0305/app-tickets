import { UserDataForm } from "@/interfaces/User/user.interface";
import { setCookies } from "@/lib/getCookies";
import { NotiSwal } from "@/lib/NotiSwal";
import {
  LoginUserSupaBase,
  RegisterUserSupaBase,
} from "@/services/user.service";
import { redirect } from "next/navigation";

export const userService = () => {
  const LoginUser = async (formUser: UserDataForm) => {
    await LoginUserSupaBase(formUser).then((res) => {
      if (res?.session) {
        setCookies("token", res?.session.access_token);

        NotiSwal({ text: "Successful Login" });

        return redirect("/dashboard");
      }
    });
  };

  const RegisterUser = async (formUser: UserDataForm) => {
    await RegisterUserSupaBase(formUser).then((res) => {
      if (res?.session) {
        setCookies("token", res?.session.access_token);

        NotiSwal({ text: "We have sent an email to confirm your username" });

        return redirect("/dashboard");
      }
    });
  };

  return { LoginUser, RegisterUser };
};
