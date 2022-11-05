export interface IInitialStateJob {
  [key: string]: string | boolean | string[] | undefined;
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

export type handleJobType = {
  name: string;
  value: string;
};

export interface createJobReturnType {
  company: string;
  createdAt: Date;
  createdBy: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IEditedJob {
  jobId: IInitialStateJob["editJobId"];
  job: Pick<
    IInitialStateJob,
    "position" | "company" | "jobLocation" | "jobType" | "status"
  >;
}
