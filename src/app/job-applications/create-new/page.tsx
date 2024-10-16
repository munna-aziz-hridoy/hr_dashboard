"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/common/progressbar";
import { Job_Post, Job_Post_Payload } from "@/types";

import { CreateJobForm, JobDescContainer } from "@/components";
import { createJobPost } from "@/api";

function CreateNew() {
  const [data, setData] = useState<Job_Post>({
    company_name: "",
    role: "",
    responsibilities: [],
    qualifications: [],
    others_requirements: [],
    benefits: [],
    education: "",
    salary: "",
    type: "",
    note: "",
    nature: "",
  });

  const [loading, setLoading] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [progress, setProgress] = useState(0);

  function handleSubmit(payload: Job_Post_Payload) {
    setJobDesc("");
    setProgress(0);

    setLoading(true);

    createJobPost(payload)
      .then((data) => {
        setJobDesc(data.job_description);
        setProgress(100);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-700 capitalize">
        Create a Job Post with AI
      </h2>
      <p className="text-xm text-gray-600">
        Provide your requirements and our <span>AI</span> will write a Job Post
        for you.
      </p>

      <div className="flex gap-5">
        <div className="max-w-4xl bg-white p-10 shadow-md rounded mt-5 w-2/3">
          {loading ? (
            <div className="min-h-96 flex justify-center items-center">
              <ProgressBar setProgress={setProgress} progress={progress} />
            </div>
          ) : (
            <CreateJobForm
              handleSubmit={handleSubmit}
              data={data}
              setData={setData}
            />
          )}
        </div>
        <JobDescContainer data={data} jobDesc={jobDesc} />
      </div>
    </div>
  );
}

export default CreateNew;
