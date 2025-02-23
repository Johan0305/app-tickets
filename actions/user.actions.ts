import { UserDataForm } from "@/interfaces/User/user.interface";
import { deleteCookies, setCookies } from "@/lib/getCookies";
import { NotiSwal } from "@/lib/NotiSwal";
import {
  GetUser,
  LoginUserSupaBase,
  Logout,
  RegisterUserSupaBase,
} from "@/services/user.service";
import { setInitialState } from "@/store/reducers/task.reducer";
import { setInitialStateUser, setUser } from "@/store/reducers/user.reducer";
import { useDispatch } from "react-redux";

export const UserService = () => {
  const dispatch = useDispatch();

  //Servicio de Login de Usuario
  const LoginUser = async (formUser: UserDataForm): Promise<void> => {
    await LoginUserSupaBase(formUser).then((res) => {
      if (res?.session) {
        dispatch(setUser(res.user));
        //Seteo de Cookies del token para su manejabilidad
        setCookies("token", res?.session.access_token);

        //Notificación de Usuario Logeado
        NotiSwal({ text: "Successful Login" });
      }
    });
  };

  //Servicio de Registro de Usuario
  const RegisterUser = async (formUser: UserDataForm) => {
    await RegisterUserSupaBase(formUser).then((res) => {
      if (res?.user) {
        //Mensaje de Envío de Correo para confirmar el usuario
        NotiSwal({ text: "We have sent an email to confirm your username" });
      }
    });
  };

  //Traer los datos del usuario la sesión actual
  const GetCurrentUser = async () => {
    await GetUser().then((res) => {
      dispatch(setUser(res));
    });
  };

  //cerrar la sesión actual
  const LogOutUser = async () => {
    await Logout().then(() => {
      dispatch(setInitialStateUser());
      dispatch(setInitialState());
      deleteCookies("token");
      NotiSwal({ text: "Succesful Logout" });
    });
  };

  return { LoginUser, RegisterUser, GetCurrentUser, LogOutUser };
};
