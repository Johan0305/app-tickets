import { NotiSwal } from "./NotiSwal";

export const HandleError = (error: unknown): void => {
  if (error) {
    NotiSwal({ icon: "error", text: error as string });
  }
};
