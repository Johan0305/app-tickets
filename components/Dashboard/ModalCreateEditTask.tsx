import { TaskService } from "@/actions/task.actions";
import { Task } from "@/interfaces/Task/ticket.interface";
import { RootState } from "@/store/store";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { useSelector } from "react-redux";

interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  dataModal?: Task | null;
}

const ModalCreateEditTask: FC<Props> = ({ onClose, dataModal }) => {
  const [data, setData] = useState<Partial<Task>>(
    dataModal || {
      title: "",
      description: "",
      date: "",
      status: false,
    }
  );
  const { CreateTask, DeleteTask, UpdateTask } = TaskService();
  const { user } = useSelector((state: RootState) => state.user);

  //Función encargada de cambiar el state de userData según el nombre de su input
  const HandleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    if (!event) return undefined;

    if (event.target.name === "status") {
      return setData((prev) => ({
        ...prev,
        status: event.target.value === "true" ? true : false,
      }));
    }

    return setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const HandleCreateTask = () => {
    if (user) CreateTask(data, user?.id).then(() => onClose(false));
  };

  const HandleUpdateTask = () => {
    if (data) UpdateTask(data).then(() => onClose(false));
  };
  const HandleDeleteTask = () => {
    if (data.id) DeleteTask(data.id).then(() => onClose(false));
  };

  return (
    <>
      <Modal.Header className="w-full">
        {dataModal ? "Edit Task" : "Create new Task"}
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-6">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Title" value="Title" />
          </div>
          <TextInput
            id="Title"
            type="text"
            placeholder="Write a title"
            name="title"
            defaultValue={data?.title}
            onChange={HandleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            name="description"
            placeholder="Leave a description..."
            required
            rows={4}
            defaultValue={data?.description}
            onChange={HandleChange}
          />
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="datepicker" value="Delivery Date" />
            </div>
            <Datepicker
              name="date"
              value={data.date ? new Date(data.date) : new Date()}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  date: e?.toISOString().split("T")[0],
                }))
              }
            />
          </div>
          {dataModal && (
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label value="Status" />
              </div>
              <Select
                name="status"
                defaultValue={String(data.status)}
                onChange={HandleChange}
              >
                <option value={"true"}>Finished</option>
                <option value={"false"}>Pending</option>
              </Select>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="w-full justify-between">
        {dataModal ? (
          <Button color="failure" onClick={HandleDeleteTask}>
            Delete
          </Button>
        ) : (
          <span />
        )}

        <div className="flex gap-3">
          <Button color="gray" onClick={() => onClose(false)}>
            Close
          </Button>
          {dataModal ? (
            <Button onClick={HandleUpdateTask} color="blue">
              Update Task
            </Button>
          ) : (
            <Button onClick={HandleCreateTask} color="success">
              Create Task
            </Button>
          )}
        </div>
      </Modal.Footer>
    </>
  );
};

export default ModalCreateEditTask;
