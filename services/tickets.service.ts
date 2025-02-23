import { supabase } from "@/environments/supabase";
import { FilterTasks, Task } from "@/interfaces/Task/ticket.interface";
import { HandleError } from "@/lib/HandleError";

//Listado de Registros en Supabase segun el id de la sesion
export const GetTasksSupaBase = async (id: string, params: FilterTasks) => {
  try {
    let query = supabase
      .from("tickets")
      .select("*")
      .eq("id_user", id)

      .order("created_at", { ascending: params.created_at })
      .like("title", `%${params.title}%`);

    if (params.status !== null) {
      query = query.eq("status", params.status);
    }

    const { data: tickets, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    return tickets as Task[];
  } catch (err: unknown) {
    HandleError(err);
  }
};

//Creación de Registros en Supabase
export const PostTasksSupaBase = async (
  dataTask: Partial<Task>,
  id: string
) => {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .insert([{ ...dataTask, id_user: id }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Task[];
  } catch (err: unknown) {
    HandleError(err);
  }
};

//Actualizacion de Registros en Supabase
export const UpdateTasksSupaBase = async (dataTask: Partial<Task>) => {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .update(dataTask)
      .eq("id", dataTask.id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Task[];
  } catch (err: unknown) {
    HandleError(err);
  }
};

//Actualizacion de Registros en Supabase
export const DeleteTasksSupaBase = async (id: string) => {
  try {
    const { error } = await supabase.from("tickets").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (err: unknown) {
    HandleError(err);
  }
};
