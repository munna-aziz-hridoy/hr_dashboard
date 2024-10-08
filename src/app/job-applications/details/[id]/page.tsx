"use client";

import React, { Fragment, useState } from "react";
import { useParams } from "next/navigation";
import { useJobPost } from "@/hooks";
import { Spinner } from "@/components";
import { marked } from "marked";
import { PrimaryButton } from "@/components/common/buttons";
import { Resume } from "@/types";
import { FiUploadCloud } from "react-icons/fi";
import { getResumeRanking } from "@/api";

function JobApplicationDetails() {
  const { id } = useParams();
  const { data, loading } = useJobPost(id as string);

  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [resumes, setResumes] = useState<Resume[]>([]);

  function handleGetRanking() {
    // Check if files are available and job description is not empty
    if (!files || !data?.job_description) {
      alert("Please upload resumes and enter a job description.");
      return;
    }
    setUploading(true);

    // Create a new FormData object to send with the request
    const payload = new FormData();
    payload.append("job_description", data.job_description);

    // Iterate through the files and append them to the payload
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        payload.append("files", files[i]);
      }
    }

    // Send the payload to your backend API using fetch

    getResumeRanking(payload)
      .then((res) => {
        setResumes(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUploading(false);
      });
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center p-5">
          <Spinner />
        </div>
      ) : (
        <div>
          <p className="text-gray-700 font-semibold mb-4">
            Created Date: {data?.createdAt?.split("T")[0]}
          </p>

          {data && (
            <div
              dangerouslySetInnerHTML={{
                __html: marked(data?.job_description as string),
              }}
            />
          )}

          {/* File Upload Area */}
          {uploading ? (
            <div className="w-full h-96 bg-gray-50 shadow-md rounded p-5 flex justify-center items-center relative mt-5">
              <Spinner />
            </div>
          ) : (
            <Fragment>
              {resumes?.length > 0 ? (
                <div className="w-full mt-5">
                  {/* Display the uploaded resumes */}

                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="py-2 px-4 text-sm font-semibold text-gray-600">
                          Name
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold text-gray-600">
                          Email
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold text-gray-600">
                          Phone
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold text-gray-600">
                          Rank
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumes.map((resume, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50 ${
                            index % 2 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {resume.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {resume.email}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {resume.phone}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {resume.rank}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-50 shadow-md rounded p-5 flex justify-center items-center relative mt-5">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                    type="file"
                    className="w-full h-full flex justify-center items-center z-10 opacity-0 cursor-pointer"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col justify-center items-center">
                    <FiUploadCloud className="text-5xl text-gray-300" />
                    <p className="text-gray-500">Upload resumes</p>
                    {files && files.length > 0 && (
                      <p className="text-gray-700 mt-2">
                        {files.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Fragment>
          )}

          {/* Submit Button */}
          <div className="mt-5">
            <PrimaryButton handleClick={handleGetRanking} text="Check" />
          </div>
        </div>
      )}
    </div>
  );
}

export default JobApplicationDetails;
