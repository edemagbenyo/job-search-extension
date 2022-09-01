import * as React from "react";
// import { browser, Tabs } from "webextension-polyfill-ts";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.scss";
import JobCard from "../components/job-card/job-card";
import { Job } from "../lib/types/job";
type Inputs = {
  term: string;
};

const jobs: Job[] = [{ title: "Software Eng", company: "Google Inc.", link: "https://google.com" }];
const Popup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  React.useEffect(() => {
    console.error("An error occured!!");
  }, [errors]);
  return (
    <section className="flex flex-col w-80 bg-white p-3">
      <header className="flex justify-between items-center">
        <h1 className="text-sm">Remotic</h1>
        <Cog8ToothIcon className="h-6 w-6 text-blue-500" />
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <input placeholder="Search a job title..." {...register("term")} className=" border-blue-500 border-2 w-full text-sm rounded-md p-1" />
      </form>
      <div>
        {jobs.map((job) => (
          <JobCard {...job}></JobCard>
        ))}
      </div>
    </section>
  );
};

export default Popup;
