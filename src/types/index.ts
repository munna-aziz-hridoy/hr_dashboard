export type Job_Post = {
  company_name: string;
  role: string;
  responsibilities: string[];
  qualifications: string[];
  others_requirements: string[];
  benefits: string[];
  education: string;
  salary: string;
  type: string;
  note: string;
};

export type Job_Post_Payload = {
  company_name: string;
  role: string;
  responsibilities: string;
  qualifications: string;
  additional_requirements: string;
  benefits: string;
  education: string;
  salary: string;
  type: string;
  note: string;
  status: string;
  user_id: string;
};

export type Job_Post_Data = {
  company_name: string;
  role: string;
  responsibilities: string;
  qualifications: string;
  additional_requirements: string;
  benefits: string;
  education: string;
  salary: string;
  type: string;
  note: string;
  status: string;
  user_id: string;
  createdAt: string;
  job_description: string;
};

export type Save_Job_Post = {
  company_name: string;
  role: string;
  responsibilities: string[];
  qualifications: string[];
  additional_requirements: string[];
  benefits: string[];
  education: string;
  salary: string;
  type: string;
  note: string;
  job_description: string;
  status: string;
  user_id: string;
};

export type Resume = {
  name: string;
  email: string;
  phone: string;
  rank: number;
};

export type JobFormData = {
  role: string;
  company_name: string;
  job_description: string;
  education: string;
  salary: string;
  type: string;
  qualifications: string[];
  additional_requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: string;
  note: string;
  user_id: string;
};

export type Candidates = {
  id: number;
  name: string;
  phone: string;
  email: string;
  rank: number;
  resume_url: string;
  education: string;
  university: string;
  job_experience: string;
  previous_company: string[];
  job_post_id: number;
};
