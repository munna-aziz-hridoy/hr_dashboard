"use client";

import React from "react";
import Table from "@/components/common/table";
import { FiPlus } from "react-icons/fi";
import { PrimaryButton } from "@/components/common/buttons";
import { useJobPosts } from "@/hooks";
import { Spinner } from "@/components";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";

type JobApplication = {
  job_id: string;
  role: string;
  company_name: string;
  type: string;
  status: string;
  createdAt: string;
};

// Define the columns array with the correct type for dataIndex
const columns: Array<{
  key: keyof JobApplication;
  title: string;
  dataIndex: keyof JobApplication;
}> = [
  {
    key: "job_id",
    title: "ID",
    dataIndex: "job_id",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
  {
    key: "company_name",
    title: "Company Name",
    dataIndex: "company_name",
  },
  {
    key: "type",
    title: "Type",
    dataIndex: "type",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "createdAt",
    title: "Created At",
    dataIndex: "createdAt",
  },
];

// Define the data with the correct type

function JobApplications() {
  const { loading, modifiedData, error } = useJobPosts();

  const actionComponent = (id: string) => {
    return (
      <Link href={`/job-applications/details/${id}`}>
        <BsEyeFill className="text-xl cursor-pointer" />
      </Link>
    );
  };

  return (
    <div className="w-full h-screen p-5">
      <h1 className="text-2xl font-semibold mb-5 text-gray-700">
        Job Applications
      </h1>

      <div>
        <div className="flex justify-between items-center my-2">
          <div />
          <div>
            <PrimaryButton
              text="Job Applications"
              link
              href="/job-applications/create-new"
              position="left"
              icon={<FiPlus className="text-xl" />}
            />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center p-4">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={modifiedData}
            action
            actionComponent={actionComponent}
          />
        )}
      </div>
    </div>
  );
}

export default JobApplications;
