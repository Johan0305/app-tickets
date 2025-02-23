"use client";

import { TaskService } from "@/actions/task.actions";
import ModalCreateEditTask from "@/components/Dashboard/ModalCreateEditTask";
import TableTask from "@/components/Dashboard/TableTask";
import { Task } from "@/interfaces/Task/ticket.interface";
import { RootState } from "@/store/store";
import { Button, Card, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { GetTasks } = TaskService();
  const { user } = useSelector((state: RootState) => state.user);
  const [open, setOpened] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<Task | null>(null);

  useEffect(() => {
    if (user) {
      GetTasks(user.id);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      <Modal
        show={open}
        onClose={() => {
          setOpened(false);
          setDataModal(null);
        }}
        size="4xl"
      >
        <ModalCreateEditTask onClose={setOpened} dataModal={dataModal} />
      </Modal>
      <h1 className="text-4xl font-bold">Hi! That&apos;s your tasks</h1>
      <Card className="w-full">
        <div className="flex justify-between">
          <TextInput
            id="title"
            placeholder="Search by title"
            className="w-1/2"
          />
          <div className="flex gap-6">
            <Select id="date" required>
              <option>Recent / Older </option>
              <option>Older / Recent </option>
            </Select>
            <Select id="status" required>
              <option value="">Status Task</option>
              <option value="true">Finished </option>
              <option value="false">Pending</option>
            </Select>
            <Button color="blue" onClick={() => setOpened(true)}>
              Add a Task
            </Button>
          </div>
        </div>
        <TableTask setDataModal={setDataModal} setOpened={setOpened} />
      </Card>
    </div>
  );
};

export default Dashboard;
