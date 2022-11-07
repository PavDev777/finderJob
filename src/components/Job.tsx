import { FC } from 'react'
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { useAppDispatch } from '../redux/hooks'
import { deleteJob, editJob } from '../redux/slices/job/jobSlice'
import { IJobs } from '../redux/slices/job/type'
import { JobInfo } from './JobInfo'

interface IJobProps extends Omit<IJobs, '__v' | 'createdBy' | 'updatedAt'> {}

export const Job: FC<IJobProps> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status
}) => {
  const dispatch = useAppDispatch()
  const date = new Date(createdAt).toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <a>{company}</a>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  editJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
