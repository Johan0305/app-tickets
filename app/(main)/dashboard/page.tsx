"use client";

import { TaskService } from "@/actions/task.actions";
import ModalCreateEditTask from "@/components/Dashboard/ModalCreateEditTask";
import TableTask from "@/components/Dashboard/TableTask";
import { FilterTasks, Task } from "@/interfaces/Task/ticket.interface";
import { RootState } from "@/store/store";
import { Button, Card, Modal, Select, TextInput } from "flowbite-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { GetTasks } = TaskService();
  const { user } = useSelector((state: RootState) => state.user);
  const [open, setOpened] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<Task | null>(null);
  const [params, setParams] = useState<FilterTasks>({
    created_at: false,
    title: "",
    status: null,
  });
  //Función para verificar si los datos iniciales de los parametros cambiaron
  const [paramsChanges, setParamsChanges] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      GetTasks(user.id, params);
    }
  }, [user, params, GetTasks]);

  //Función para ir cambiando el estado de los parametros
  const handleChangeParams = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setParamsChanges(true);

    //Excepción para ordernar de forma ascendente o descendente
    if (e.target.name === "created_at") {
      return setParams((prev) => ({
        ...prev,
        [e.target.name]: e.target.value === "true" ? true : false,
      }));
    }

    //Excepción para filtrar por estado de la tarea
    if (e.target.name === "status") {
      return setParams((prev) => ({
        ...prev,
        [e.target.name]:
          e.target.value === "true"
            ? true
            : e.target.value === "null"
            ? null
            : false,
      }));
    }

    return setParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-6 px-6 lg:gap-10">
      <Modal
        show={open}
        onClose={() => {
          setOpened(false);
          setDataModal(null);
        }}
        size="4xl"
        position="center"
      >
        <ModalCreateEditTask onClose={setOpened} dataModal={dataModal} />
      </Modal>
      <h1 className="text-4xl font-bold">
        Welcome! <br /> That&apos;s your tasks
      </h1>
      <Card className="w-full">
        <div className="flex flex-col gap-6 lg:flex-row justify-between">
          <TextInput
            id="title"
            name="title"
            placeholder="Search by title"
            className="w-full lg:w-1/2"
            onChange={handleChangeParams}
          />
          <div className="grid grid-cols-2 lg:flex gap-6">
            {paramsChanges && (
              <span
                className="text-blue-500 text-sm pt-3 cursor-pointer"
                onClick={() => {
                  setParams({
                    created_at: false,
                    title: "",
                    status: null,
                  });
                  setParamsChanges(false);
                }}
              >
                Reset Filters
              </span>
            )}
            <Select
              id="date"
              required
              name="created_at"
              onChange={handleChangeParams}
            >
              <option value={"false"}>Recent / Older </option>
              <option value={"true"}>Older / Recent </option>
            </Select>
            <Select
              id="status"
              required
              name="status"
              onChange={handleChangeParams}
            >
              <option value="null" aria-readonly>
                All Task
              </option>
              <option value="true">Finished</option>
              <option value="false">Pending</option>
            </Select>
            <Button
              color="blue"
              className="col-span-2"
              onClick={() => setOpened(true)}
            >
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
