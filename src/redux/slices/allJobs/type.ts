import { createJobReturnType } from "../job/type";

export interface IInitialStateAllJobs {
  isLoading: boolean;
  jobs: createJobReturnType[] | null;
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: string[];
}

export type sortOptionsType = "latest" | "oldest" | "a-z" | "z-a";

export interface IInitialFiltersState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: sortOptionsType[];
}
