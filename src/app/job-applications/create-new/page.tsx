"use client";

import React, { useState } from "react";
import { PrimaryButton } from "@/components/common/buttons";
import ProgressBar from "@/components/common/progressbar";
import { Job_Post } from "@/types";
import { marked } from "marked";
import { BiTrashAlt } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";

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
  });

  const [responsibility, setResponsibility] = useState("");
  const [benefits, setBenefits] = useState("");
  const [others, setOthers] = useState("");
  const [qualification, setQualification] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobDesc, setJobDesc] = useState("");

  const [progress, setProgress] = useState(0);

  function handleSubmit() {
    setJobDesc("");
    setProgress(0);
    const payload = {
      ...data,
      responsibilities: data.responsibilities
        .map((r, i) => `${i + 1} - ${r}`)
        .join("\n"),
      benefits: data.benefits.map((b, i) => `${i + 1} - ${b}`).join("\n"),
      additional_requirements: data.others_requirements
        .map((o, i) => `${i + 1} - ${o}`)
        .join("\n"),
      qualifications: data.qualifications
        .map((q, i) => `${i + 1} - ${q}`)
        .join("\n"),
    };

    setLoading(true);

    fetch("http://localhost:5000/job-posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response_data) => {
        setLoading(false);
        setProgress(100);
        setJobDesc(response_data.job_description);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function handleSaveJobDesc() {
    const payload = {
      role: data.role,
      company_name: data.company_name,
      job_description: jobDesc,
      education: data.education,
      salary: data.salary,
      type: data.type,
      user_id: "user_001",
    };

    setSaving(true);

    fetch("http://localhost:5000/job-posts/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setSaving(false);

        alert("Job is saved successfully");
        console.log(data);
      });
  }

  console.log(saving);

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
            <div>
              <div>
                <label
                  htmlFor="title"
                  className="text-sm text-gray-500 font-light"
                >
                  Company Name
                </label>
                <input
                  value={data.company_name}
                  onChange={(e) =>
                    setData({ ...data, company_name: e.target.value })
                  }
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
                  placeholder="Company name.."
                />
              </div>
              <div className="mt-5 flex gap-4">
                <div className="w-2/3">
                  <label
                    htmlFor="title"
                    className="text-sm text-gray-500 font-light"
                  >
                    Role
                  </label>
                  <input
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150"
                    placeholder="Job role goes here.."
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="title"
                    className="text-sm text-gray-500 font-light"
                  >
                    Type
                  </label>
                  <select
                    value={data.type}
                    onChange={(e) => setData({ ...data, type: e.target.value })}
                    className="w-full block p-2 mt-1 rounded bg-transparent border border-gray-200 focus:outline outline-1 outline-gray-300 text-sm text-gray-500"
                  >
                    <option value="" selected disabled>
                      Select an option
                    </option>
                    <option value="on-site">On Site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <div className="w-full flex items-end gap-2">
                  <div className="w-[calc(100%-50px)]">
                    <label
                      htmlFor="title"
                      className="text-sm text-gray-500 font-light"
                    >
                      Responsibilities
                    </label>
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          if (responsibility) {
                            setData({
                              ...data,
                              responsibilities: [
                                ...data.responsibilities,
                                responsibility,
                              ],
                            });
                            setResponsibility("");
                          }
                        }
                      }}
                      value={responsibility}
                      onChange={(e) => setResponsibility(e.target.value)}
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150"
                      placeholder="Type and press the plus button.."
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (responsibility) {
                        setData({
                          ...data,
                          responsibilities: [
                            ...data.responsibilities,
                            responsibility,
                          ],
                        });
                        setResponsibility("");
                      }
                    }}
                    type="button"
                    className="p-2 border border-gray-200 focus:border-gray-300 w-[45px] flex justify-center items-center shadow-sm focus:shadow-md duration-150 rounded"
                  >
                    <BsPlus className="text-2xl" />
                  </button>
                </div>

                {data.responsibilities.length !== 0 &&
                  data.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mt-2 border-b border-gray-100 pb-1"
                    >
                      <div className="flex items-center gap-2 ">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <p className="text-sm text-gray-600">{item}</p>
                      </div>
                      <button
                        onClick={() => {
                          setData({
                            ...data,
                            responsibilities: data.responsibilities.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                        className="text-red-400"
                      >
                        <BiTrashAlt />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <div className="w-full flex items-end gap-2">
                  <div className="w-[calc(100%-50px)]">
                    <label
                      htmlFor="title"
                      className="text-sm text-gray-500 font-light"
                    >
                      Qualifications
                    </label>
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          if (qualification) {
                            setData({
                              ...data,
                              qualifications: [
                                ...data.qualifications,
                                qualification,
                              ],
                            });
                            setQualification("");
                          }
                        }
                      }}
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150"
                      placeholder="Type and press the plus button.."
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (qualification) {
                        setData({
                          ...data,
                          qualifications: [
                            ...data.qualifications,
                            qualification,
                          ],
                        });
                        setQualification("");
                      }
                    }}
                    type="button"
                    className="p-2 border border-gray-200 focus:border-gray-300 w-[45px] flex justify-center items-center shadow-sm focus:shadow-md duration-150 rounded"
                  >
                    <BsPlus className="text-2xl" />
                  </button>
                </div>

                {data.qualifications.length !== 0 &&
                  data.qualifications.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mt-2 border-b border-gray-100 pb-1"
                    >
                      <div className="flex items-center gap-2 ">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <p className="text-sm text-gray-600">{item}</p>
                      </div>
                      <button
                        onClick={() => {
                          setData({
                            ...data,
                            qualifications: data.qualifications.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                        className="text-red-400"
                      >
                        <BiTrashAlt />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <div className="w-full flex items-end gap-2">
                  <div className="w-[calc(100%-50px)]">
                    <label
                      htmlFor="title"
                      className="text-sm text-gray-500 font-light"
                    >
                      Other requirements
                    </label>
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          if (others) {
                            setData({
                              ...data,
                              others_requirements: [
                                ...data.others_requirements,
                                others,
                              ],
                            });
                            setOthers("");
                          }
                        }
                      }}
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150"
                      placeholder="Type and press the plus button.."
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (others) {
                        setData({
                          ...data,
                          others_requirements: [
                            ...data.others_requirements,
                            others,
                          ],
                        });
                        setOthers("");
                      }
                    }}
                    type="button"
                    className="p-2 border border-gray-200 focus:border-gray-300 w-[45px] flex justify-center items-center shadow-sm focus:shadow-md duration-150 rounded"
                  >
                    <BsPlus className="text-2xl" />
                  </button>
                </div>

                {data.others_requirements.length !== 0 &&
                  data.others_requirements.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mt-2 border-b border-gray-100 pb-1"
                    >
                      <div className="flex items-center gap-2 ">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <p className="text-sm text-gray-600">{item}</p>
                      </div>
                      <button
                        onClick={() => {
                          setData({
                            ...data,
                            others_requirements:
                              data.others_requirements.filter(
                                (_, i) => i !== index
                              ),
                          });
                        }}
                        className="text-red-400"
                      >
                        <BiTrashAlt />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <div className="w-full flex items-end gap-2">
                  <div className="w-[calc(100%-50px)]">
                    <label
                      htmlFor="title"
                      className="text-sm text-gray-500 font-light"
                    >
                      Benefits
                    </label>
                    <input
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          if (benefits) {
                            setData({
                              ...data,
                              benefits: [...data.benefits, benefits],
                            });
                            setBenefits("");
                          }
                        }
                      }}
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150"
                      placeholder="Type and press the plus button.."
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (benefits) {
                        setData({
                          ...data,
                          benefits: [...data.benefits, benefits],
                        });
                        setBenefits("");
                      }
                    }}
                    type="button"
                    className="p-2 border border-gray-200 focus:border-gray-300 w-[45px] flex justify-center items-center shadow-sm focus:shadow-md duration-150 rounded"
                  >
                    <BsPlus className="text-2xl" />
                  </button>
                </div>

                {data.benefits.length !== 0 &&
                  data.benefits.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 mt-2 border-b border-gray-100 pb-1"
                    >
                      <div className="flex items-center gap-2 ">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <p className="text-sm text-gray-600">{item}</p>
                      </div>
                      <button
                        onClick={() => {
                          setData({
                            ...data,
                            benefits: data.benefits.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                        className="text-red-400"
                      >
                        <BiTrashAlt />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="title"
                  className="text-sm text-gray-500 font-light"
                >
                  Education
                </label>
                <input
                  value={data.education}
                  onChange={(e) =>
                    setData({ ...data, education: e.target.value })
                  }
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
                  placeholder="Education goes here.."
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="title"
                  className="text-sm text-gray-500 font-light"
                >
                  Salary
                </label>
                <input
                  value={data.salary}
                  onChange={(e) => setData({ ...data, salary: e.target.value })}
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
                  placeholder="Salary.."
                />
              </div>

              <div className="mt-5">
                <PrimaryButton
                  handleClick={handleSubmit}
                  text="Submit"
                  fullWidth
                />
              </div>
            </div>
          )}
        </div>
        <div className="bg-white p-10 w-[45%] shadow min-h-96 max-w-[calc(100%-56rem)]]">
          {jobDesc ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: marked(jobDesc) }} />
              <div className="mt-5">
                <PrimaryButton
                  handleClick={handleSaveJobDesc}
                  text="Save"
                  icon={<MdSaveAlt className="text-xl" />}
                  position="left"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-lg font-semibold text-gray-700 text-center">
                The generated job description will be displayed here.
              </h2>
              <p className="text-sm font-medium text-gray-600 text-justify">
                Simply provide the key details of what you are looking for in
                the ideal candidate, and our AI will craft a comprehensive and
                professional job description tailored to your needs. Whether it
                for technical roles, creative positions, or management-level
                opportunities, our AI tool will handle the heavy
                lifting—allowing you to focus on more critical tasks. Sit back,
                relax, and let our AI do the writing. Enjoy your coffee while we
                create a compelling job description that attracts the right
                talent!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
