import { supabase } from "@/environments/supabase";
import { Task } from "@/interfaces/Task/ticket.interface";
import { HandleError } from "@/lib/HandleError";

export const GetTasksSupaBase = async (id: string) => {
  try {
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id_user", id);

    if (error) {
      throw new Error(error.message);
    }

    return tickets as Task[];
  } catch (err: unknown) {
    HandleError(err);
  }
};
