import { NotiSwal } from "./NotiSwal";

//Función para manejo de errores
export const HandleError = (error: unknown): void => {
  if (error) {
    NotiSwal({ icon: "error", text: error as string });
  }
};
