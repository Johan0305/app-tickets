import { FilterTasks, Task } from "@/interfaces/Task/ticket.interface";
import { NotiSwal } from "@/lib/NotiSwal";
import {
  DeleteTasksSupaBase,
  GetTasksSupaBase,
  PostTasksSupaBase,
  UpdateTasksSupaBase,
} from "@/services/tickets.service";
import {
  addTask,
  deleteTask,
  editTask,
  setTasks,
} from "@/store/reducers/task.reducer";
import { useDispatch } from "react-redux";

export const TaskService = () => {
  const dispatch = useDispatch();

  //Función para traer las tareas del usuario
  const GetTasks = async (id: string, params: FilterTasks): Promise<void> => {
    await GetTasksSupaBase(id, params).then((res) => {
      dispatch(setTasks(res as Task[]));
    });
  };

  //Función para crear las tareas del usuario
  const CreateTask = async (
    dataTask: Partial<Task>,
    id: string
  ): Promise<void> => {
    await PostTasksSupaBase(dataTask, id).then((res) => {
      if (res) {
        dispatch(addTask({ ...res[0] }));
        NotiSwal({ text: "Task has been created" });
      }
    });
  };

  const UpdateTask = async (dataTask: Partial<Task>): Promise<void> => {
    await UpdateTasksSupaBase(dataTask).then((res) => {
      console.log(res);
      if (res) {
        dispatch(editTask({ ...res[0] }));
        NotiSwal({ text: "Task updated successful" });
      }
    });
  };

  const DeleteTask = async (id: string): Promise<void> => {
    await DeleteTasksSupaBase(id).then((res) => {
      console.log(res);
      if (res) {
        dispatch(deleteTask(id));
        NotiSwal({ text: "Task delete successful" });
      }
    });
  };
  return { GetTasks, CreateTask, UpdateTask, DeleteTask };
};
