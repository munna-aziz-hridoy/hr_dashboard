"use client";

import React from "react";
import Table from "@/components/common/table";
import { FiPlus } from "react-icons/fi";
import { PrimaryButton } from "@/components/common/buttons";

type JobApplication = {
  jobId: string;
  applicantName: string;
  position: string;
  status: string;
  appliedDate: string;
};

// Define the columns array with the correct type for dataIndex
const columns: Array<{
  key: keyof JobApplication;
  title: string;
  dataIndex: keyof JobApplication;
}> = [
  { key: "jobId", title: "Job ID", dataIndex: "jobId" },
  { key: "applicantName", title: "Applicant Name", dataIndex: "applicantName" },
  { key: "position", title: "Position", dataIndex: "position" },
  { key: "status", title: "Status", dataIndex: "status" },
  { key: "appliedDate", title: "Applied Date", dataIndex: "appliedDate" },
];

// Define the data with the correct type
const data: JobApplication[] = [
  {
    jobId: "J101",
    applicantName: "John Doe",
    position: "Frontend Developer",
    status: "Shortlisted",
    appliedDate: "2024-09-20",
  },
  {
    jobId: "J102",
    applicantName: "Jane Smith",
    position: "Backend Developer",
    status: "Interviewed",
    appliedDate: "2024-09-22",
  },
  {
    jobId: "J103",
    applicantName: "Samuel Green",
    position: "Data Scientist",
    status: "Hired",
    appliedDate: "2024-09-25",
  },
  {
    jobId: "J104",
    applicantName: "Alice Brown",
    position: "UI/UX Designer",
    status: "Rejected",
    appliedDate: "2024-09-18",
  },
  {
    jobId: "J105",
    applicantName: "Michael Lee",
    position: "Project Manager",
    status: "Applied",
    appliedDate: "2024-09-19",
  },
];

function JobApplications() {
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
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default JobApplications;
