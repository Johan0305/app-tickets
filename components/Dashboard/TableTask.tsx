import { Task } from "@/interfaces/Task/ticket.interface";
import { RootState } from "@/store/store";
import { Dropdown, Table } from "flowbite-react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";

interface Props {
  setDataModal: Dispatch<SetStateAction<Task | null>>;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const TableTask: FC<Props> = ({ setDataModal, setOpened }) => {
  const { tasks } = useSelector((state: RootState) => state.task);

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Title</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {tasks?.map((task) => (
          <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key={task.id}
            onClick={() => {
              setDataModal(task);
              setOpened(true);
            }}
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {task.title}
            </Table.Cell>
            <Table.Cell>{`${task.description.slice(0, 20)}...`}</Table.Cell>
            <Table.Cell>{task.date}</Table.Cell>
            <Table.Cell>{task.status ? "true" : "false"}</Table.Cell>
            <Table.Cell>
              <Dropdown inline>
                <Dropdown.Item
                  onClick={() => {
                    setDataModal(task);
                    setOpened(true);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineEdit />
                    Edit
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="flex gap-2 items-center">
                    <FaTrash />
                    Delete
                  </div>
                </Dropdown.Item>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableTask;
