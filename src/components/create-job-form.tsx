"use client";

import React, { useState } from "react";
import { Job_Post, Job_Post_Payload } from "@/types";
import { BsPlus } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";
import { PrimaryButton } from "./common/buttons";

type Props = {
  handleSubmit: (data: Job_Post_Payload) => void;
  data: Job_Post;
  setData: React.Dispatch<React.SetStateAction<Job_Post>>;
};

function CreateJobForm({ handleSubmit, data, setData }: Props) {
  const [responsibility, setResponsibility] = useState("");
  const [benefits, setBenefits] = useState("");
  const [others, setOthers] = useState("");
  const [qualification, setQualification] = useState("");

  return (
    <div>
      <div>
        <label htmlFor="title" className="text-sm text-gray-500 font-light">
          Company Name
        </label>
        <input
          value={data.company_name}
          onChange={(e) => setData({ ...data, company_name: e.target.value })}
          type="text"
          className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
          placeholder="Company name.."
        />
      </div>
      <div className="mt-5 flex gap-4">
        <div className="w-full">
          <label htmlFor="title" className="text-sm text-gray-500 font-light">
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
      </div>

      <div className="mt-5 flex gap-4">
        <div className="w-1/2">
          <label htmlFor="title" className="text-sm text-gray-500 font-light">
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

        <div className="w-1/2">
          <label htmlFor="title" className="text-sm text-gray-500 font-light">
            Nature
          </label>
          <select
            value={data.nature}
            onChange={(e) => setData({ ...data, nature: e.target.value })}
            className="w-full block p-2 mt-1 rounded bg-transparent border border-gray-200 focus:outline outline-1 outline-gray-300 text-sm text-gray-500"
          >
            <option value="" selected disabled>
              Select an option
            </option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full flex items-end gap-2">
          <div className="w-[calc(100%-50px)]">
            <label htmlFor="title" className="text-sm text-gray-500 font-light">
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
                  responsibilities: [...data.responsibilities, responsibility],
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
            <label htmlFor="title" className="text-sm text-gray-500 font-light">
              Qualifications
            </label>
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  if (qualification) {
                    setData({
                      ...data,
                      qualifications: [...data.qualifications, qualification],
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
                  qualifications: [...data.qualifications, qualification],
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
            <label htmlFor="title" className="text-sm text-gray-500 font-light">
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
                  others_requirements: [...data.others_requirements, others],
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
                    others_requirements: data.others_requirements.filter(
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
            <label htmlFor="title" className="text-sm text-gray-500 font-light">
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
                    benefits: data.benefits.filter((_, i) => i !== index),
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
        <label htmlFor="title" className="text-sm text-gray-500 font-light">
          Education
        </label>
        <input
          value={data.education}
          onChange={(e) => setData({ ...data, education: e.target.value })}
          type="text"
          className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
          placeholder="Education goes here.."
        />
      </div>

      <div className="mt-5">
        <label htmlFor="title" className="text-sm text-gray-500 font-light">
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
        <label htmlFor="title" className="text-sm text-gray-500 font-light">
          Generate Instruction
        </label>
        <textarea
          value={data.note}
          onChange={(e) => setData({ ...data, note: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded shadow-sm mt-1 focus:outline outline-1 outline-gray-300 focus:shadow-md duration-150 placeholder:text-sm"
          placeholder="If you have any extra instruction about generating the job description, write here"
        />
      </div>

      <div className="mt-5">
        <PrimaryButton
          handleClick={() =>
            handleSubmit({
              company_name: data.company_name,
              education: data.education,
              salary: data.salary,
              note: data.note,
              role: data.role,
              type: data.type,
              responsibilities: data.responsibilities.join(", "),
              benefits: data.benefits.join(", "),
              additional_requirements: data.others_requirements.join(", "),
              qualifications: data.qualifications.join(", "),
              status: "Proccecing",
              user_id: "user_001",
              nature: data.nature,
            })
          }
          text="Submit"
          fullWidth
        />
      </div>
    </div>
  );
}

export default CreateJobForm;
