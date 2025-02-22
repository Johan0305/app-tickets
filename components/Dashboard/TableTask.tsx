import { Dropdown, Table } from "flowbite-react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const TableTask = () => {
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
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {'Apple MacBook Pro 17"'}
          </Table.Cell>
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>True</Table.Cell>
          <Table.Cell>
            <Dropdown inline>
              <Dropdown.Item>
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
      </Table.Body>
    </Table>
  );
};

export default TableTask;
