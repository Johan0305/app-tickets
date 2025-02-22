"use client";

import TableTask from "@/components/Dashboard/TableTask";
import { Card } from "flowbite-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Hi! That&apos;s your tasks</h1>
      <Card className="w-full">
        <TableTask />
      </Card>
    </div>
  );
};

export default page;
