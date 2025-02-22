interface UserDataForm {
  email: string;
  password: string;
}

interface User {
  uuid: string;
  email: string;
  display_name: string;
}

export type { UserDataForm, User };
