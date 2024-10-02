"use client";

import React, { Fragment, useState } from "react";
import { PrimaryButton } from "@/components/common/buttons"; // Assuming you have this button component
import { FiUploadCloud } from "react-icons/fi";
import { Resume } from "@/types";

export default function Home() {
  const [job_descriptions, setJob_descriptions] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  // Ensure the initial state is set to null

  // Function to handle the file upload and job description submission
  async function handleGetRanking() {
    // Check if files are available and job description is not empty
    if (!files || !job_descriptions) {
      alert("Please upload resumes and enter a job description.");
      return;
    }
    setLoading(true);

    // Create a new FormData object to send with the request
    const payload = new FormData();
    payload.append("job_description", job_descriptions);

    // Iterate through the files and append them to the payload
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        payload.append("files", files[i]);
      }
    }

    // Send the payload to your backend API using fetch
    try {
      const response = await fetch(
        "https://resume-sorter.onrender.com/resume-upload/upload-multiple",
        {
          method: "POST",
          body: payload,
        }
      );

      if (response.ok) {
        const result = await response.json();

        setResumes(result?.data);
        console.log("Files uploaded successfully:", result);
        alert("Files uploaded successfully!");
      } else {
        console.error("Failed to upload files");
        alert("Failed to upload files. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading the files.");
    } finally {
      setLoading(false);
    }
  }

  console.log(resumes);

  return (
    <main>
      <div className="w-full h-screen p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-700">
          Short List Resume
        </h1>

        <div className="flex flex-col gap-10">
          {/* Job Description Input Area */}
          <div className="w-full h-96 bg-gray-50 shadow-md rounded p-5">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Your Job Description Here
            </h2>
            <textarea
              onChange={(e) => setJob_descriptions(e.target.value)}
              className="w-full h-64 bg-white border border-gray-100 rounded outline-none focus:outline outline-1 outline-gray-200 p-4"
              placeholder="Enter job description here..."
            />
          </div>

          {/* File Upload Area */}
          {loading ? (
            <div className="flex w-full justify-center items-center">
              <p className="text-center text-lg font-semibold text-gray-600">
                Loading....
              </p>
            </div>
          ) : (
            <Fragment>
              {resumes?.length > 0 ? (
                <div className="w-full">
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
                <div className="w-full h-96 bg-gray-50 shadow-md rounded p-5 flex justify-center items-center relative">
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
          <div>
            <PrimaryButton handleClick={handleGetRanking} text="Check" />
          </div>
        </div>
      </div>
    </main>
  );
}
