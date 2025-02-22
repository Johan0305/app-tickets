import { supabase } from "@/environments/supabase";
import { UserDataForm } from "@/interfaces/User/user.interface";
import { HandleError } from "@/lib/HandleError";

export const LoginUserSupaBase = async (formData: UserDataForm) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(formData);

    if (error) {
      throw new Error(error?.message);
    }

    return data;
  } catch (err: unknown) {
    HandleError(err);
  }
};

export const RegisterUserSupaBase = async (formData: UserDataForm) => {
  try {
    const { data, error } = await supabase.auth.signUp(formData);

    if (error) {
      throw new Error(error?.message);
    }

    return data;
  } catch (err: unknown) {
    HandleError(err);
  }
};

export const GetUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error?.message);
    }

    return user;
  } catch (err: unknown) {
    HandleError(err);
  }
};

export const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error?.message);
    }

    return true;
  } catch (err: unknown) {
    HandleError(err);
  }
};
