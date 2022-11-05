import { createJobReturnType } from "../job/type";

export interface IInitialStateAllJobs extends IInitialFiltersState {
  [key: string]:
    | string
    | boolean
    | string[]
    | createJobReturnType[]
    | undefined
    | null
    | number
    | IStats["defaultStats"]
    | IStats["monthlyApplications"];
  isLoading: boolean;
  jobs: createJobReturnType[] | null;
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: IStats["defaultStats"] | null;
  monthlyApplications: IStats["monthlyApplications"];
}

export type sortOptionsType = "latest" | "oldest" | "a-z" | "z-a";

export interface IInitialFiltersState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: sortOptionsType[];
}

export interface IMonthlyApplications {
  date: string;
  count: number;
}

export interface IStats {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
  monthlyApplications: IMonthlyApplications[];
}
