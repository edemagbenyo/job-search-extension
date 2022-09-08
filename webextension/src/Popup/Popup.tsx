import React, { useEffect, useState } from "react";
// import { browser, Tabs } from "webextension-polyfill-ts";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.scss";
import JobCard from "../components/job-card/job-card";
import { Job } from "@lib/types/job";
import { getJobs } from "@lib/api/job";
type Inputs = {
  term: string;
};

const Popup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setJobTitle(data.term);
  };
  useEffect(() => {
    const getAllJobs = async () => {
      const jobs = await getJobs(jobTitle);
      if (jobs) {
        setAvailableJobs(jobs);
      }
      // return jobs;
    };

    getAllJobs();
  }, [jobTitle]);

  useEffect(() => {
    console.error("An error occured!!");
  }, [errors]);
  return (
    <section className="flex flex-col w-80 bg-white p-3">
      <header className="flex justify-between items-center">
        <h1 className="text-sm">Remotic</h1>
        <Cog8ToothIcon className="h-6 w-6 text-blue-500" />
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <input placeholder="Search a job title..." {...register("term", { required: true })} className=" border-blue-500 border-2 w-full text-sm rounded-md p-1" />
        <span className="text-right block text-xs">Press Enter</span>
      </form>
      <div>
        {availableJobs.map((job, index) => (
          <JobCard key={index} {...job}></JobCard>
        ))}
      </div>
    </section>
  );
};

export default Popup;
