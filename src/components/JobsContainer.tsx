import { useEffect } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getAllJobs } from '../redux/slices/allJobs/allJobsSlice'
import { allJobsSelector } from '../redux/slices/allJobs/selectors'
import { ButtonContainerPage } from './ButtonContainerPage'
import { Job } from './Job'
import { useDebounce } from 'use-debounce'

export const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort
  } = useAppSelector(allJobsSelector)
  const dispatch = useAppDispatch()
  const [searchValue] = useDebounce(search, 1000)

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, searchValue, searchStatus, searchType, sort])

  if (isLoading) {
    return (
      <MagnifyingGlass
        height='150'
        width='100%'
        ariaLabel='MagnifyingGlass-loading'
        wrapperStyle={{ display: 'grid', placeContent: 'center' }}
        wrapperClass='MagnifyingGlass-wrapper'
        glassColor='#c0efff'
        color='#e15b64'
      />
    )
  }

  if (!jobs?.length) {
    return (
      <Wrapper>
        <h2>Jobs list is empty...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs?.map(job => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <ButtonContainerPage />}
    </Wrapper>
  )
}
