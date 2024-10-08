"use client";

import React, { useState } from "react";
import { PrimaryButton } from "./common/buttons";
import { MdSaveAlt } from "react-icons/md";
import { marked } from "marked";
import { Job_Post, Save_Job_Post } from "@/types";
import { saveJobPost } from "@/api/job_post";
import Spinner from "./common/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  jobDesc: string;
  data: Job_Post;
};

function JobDescContainer({ jobDesc, data }: Props) {
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  function handleSaveJobDesc() {
    const payload: Save_Job_Post = {
      role: data.role,
      company_name: data.company_name,
      job_description: jobDesc,
      education: data.education,
      salary: data.salary,
      type: data.type,
      qualifications: data.qualifications,
      benefits: data.benefits,
      note: data.note,
      status: "Procecing",
      responsibilities: data.responsibilities,
      additional_requirements: data.others_requirements,
      user_id: "user_001",
    };

    setSaving(true);

    saveJobPost(payload)
      .then(() => {
        toast.success("Job description saved successfully");
        router.back();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to save job description");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (
    <div className="bg-white p-10 w-[45%] shadow min-h-96 max-w-[calc(100%-56rem)]]">
      {jobDesc ? (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(jobDesc),
            }}
          />
          {saving ? (
            <div className="mt-5">
              <Spinner />
            </div>
          ) : (
            <div className="mt-5">
              <PrimaryButton
                handleClick={handleSaveJobDesc}
                text="Save"
                icon={<MdSaveAlt className="text-xl" />}
                position="left"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold text-gray-700 text-center">
            The generated job description will be displayed here.
          </h2>
          <p className="text-sm font-medium text-gray-600 text-justify">
            Simply provide the key details of what you are looking for in the
            ideal candidate, and our AI will craft a comprehensive and
            professional job description tailored to your needs. Whether it for
            technical roles, creative positions, or management-level
            opportunities, our AI tool will handle the heavy lifting—allowing
            you to focus on more critical tasks. Sit back, relax, and let our AI
            do the writing. Enjoy your coffee while we create a compelling job
            description that attracts the right talent!
          </p>
        </div>
      )}
    </div>
  );
}

export default JobDescContainer;
