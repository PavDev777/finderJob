import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { fetchCustom } from '../../../utils/axios'
import { createJobReturnType, handleJobType } from '../job/type'
import { IInitialFiltersState, IInitialStateAllJobs, IStats } from './type'

const initialFiltersState: IInitialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const initialState: IInitialStateAllJobs = {
  isLoading: false,
  jobs: null,
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: null,
  monthlyApplications: [],
  ...initialFiltersState
}

export const getAllJobs = createAsyncThunk<
  createJobReturnType,
  void,
  { state: { allJobs: IInitialStateAllJobs }; rejectValue: string }
>('allJobs/getAllJobs', async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}${
    search ? `&search=${search}` : ''
  }`
  try {
    const response = await fetchCustom.get(url)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue('There was error')
    }
  }
})

export const showStats = createAsyncThunk<
  IStats,
  void,
  { rejectValue: string }
>('allJobs/showStats', async (_, thunkAPI) => {
  try {
    const response = await fetchCustom.get('/jobs/stats')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg)
    }
  }
})

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    changeHandler(state, action: PayloadAction<handleJobType>) {
      state.page = 1
      state[action.payload.name] = action.payload.value
    },
    resetFilters(state) {
      return {
        ...state,
        ...initialFiltersState
      }
    },
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    clearAllJobs: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getAllJobs.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false
      state.jobs = action.payload.jobs
      state.numOfPages = action.payload.numOfPages
      state.totalJobs = action.payload.totalJobs
    })
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload, {
        autoClose: 1500
      })
    })
    builder.addCase(showStats.pending, state => {
      state.isLoading = true
    })
    builder.addCase(showStats.fulfilled, (state, action) => {
      state.isLoading = false
      state.stats = action.payload.defaultStats
      state.monthlyApplications = action.payload.monthlyApplications
    })
    builder.addCase(showStats.rejected, (state, action) => {
      state.isLoading = false
      toast.error(action.payload, {
        autoClose: 1500
      })
    })
  }
})

export const { changeHandler, resetFilters, changePage, clearAllJobs } =
  allJobsSlice.actions

export default allJobsSlice.reducer
