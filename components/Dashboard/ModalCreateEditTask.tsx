import { Task } from "@/interfaces/Task/ticket.interface";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  dataModal?: Task | null;
}

const ModalCreateEditTask: FC<Props> = ({ onClose, dataModal }) => {
  const HandleCreateTask = () => {};

  const HandleUpdateTask = () => {};

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
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Leave a description..."
            required
            rows={4}
          />
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="datepicker" value="Delivery Date" />
            </div>
            <Datepicker />
          </div>
          {dataModal && (
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label value="Status" />
              </div>
              <Select>
                <option>Finished</option>
                <option>Pending</option>
              </Select>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="w-full justify-between">
        {dataModal ? (
          <Button color="failure" onClick={() => onClose(false)}>
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
