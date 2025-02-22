import Swal, { SweetAlertOptions } from "sweetalert2";

//Función de notificaciones tipo Toast
export const NotiSwal = ({
  position = "top",
  timer = 3000,
  ...props
}: SweetAlertOptions) => {
  //Instancia de SweetAlert
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseenter", Swal.resumeTimer);
    },
  });

  //Llama al metodo 'fire' de la instancia
  Toast.fire({
    icon: props.icon || "success",
    text: props.text || "Notification",
  });
};
