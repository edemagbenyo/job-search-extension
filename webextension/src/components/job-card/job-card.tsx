import React from "react";
import { Job } from "../../lib/types/job";

function JobCard({ title, company, link }: Job) {
  return (
    <article className="flex justify-between items-center  border-b p-1">
      <div className="flex-col">
        <h1 className="text-lg">{title}</h1>
        <h2>{company}</h2>
      </div>
      <div className="flex flex-col">
        <span>RemoteOk</span>
        <a className="rounded-md bg-red-500 text-white text-center text-sm w-14" href={link}>
          Go To
        </a>
      </div>
    </article>
  );
}

export default JobCard;
