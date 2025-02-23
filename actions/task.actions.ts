import { GetTasksSupaBase } from "@/services/tickets.service";
import { setTasks } from "@/store/reducers/task.reducer";
import { useDispatch } from "react-redux";

export const TaskService = () => {
  const dispatch = useDispatch();

  const GetTasks = async (id: string) => {
    await GetTasksSupaBase(id).then((res) => {
      dispatch(setTasks(res));
    });
  };

  const CreateTask = async (id: string) => {
    await GetTasksSupaBase(id).then((res) => {
      console.log(res);
    });
  };

  const UpdateTask = async (id: string) => {
    await GetTasksSupaBase(id).then((res) => {
      console.log(res);
    });
  };
  const DeleteTask = async (id: string) => {
    await GetTasksSupaBase(id).then((res) => {
      console.log(res);
    });
  };
  return { GetTasks, CreateTask };
};
