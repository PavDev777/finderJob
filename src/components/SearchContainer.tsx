import { ChangeEvent, MouseEvent } from 'react'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  changeHandler,
  resetFilters
} from '../redux/slices/allJobs/allJobsSlice'
import { allJobsSelector } from '../redux/slices/allJobs/selectors'
import { jobSelector } from '../redux/slices/job/selectors'
import { FormRow, inputType } from './FormRow'
import { FormRowSelect } from './FormRowSelect'

export const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector(allJobsSelector)
  const { jobTypeOptions, statusOptions } = useAppSelector(jobSelector)
  const dispatch = useAppDispatch()

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(changeHandler({ name: e.target.name, value: e.target.value }))
  }

  const resetHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(resetFilters())
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>search</h4>
        <div className='form-center'>
          <FormRow
            type={inputType.TEXT}
            name='search'
            value={search}
            handleChange={searchHandler}
          />
          <FormRowSelect
            name='searchStatus'
            value={searchStatus}
            handleChange={searchHandler}
            listOptions={['all', ...statusOptions]}
          />
          <FormRowSelect
            name='searchType'
            value={searchType}
            handleChange={searchHandler}
            listOptions={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={searchHandler}
            listOptions={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={resetHandler}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
