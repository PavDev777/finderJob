import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { allJobsSelector } from '../redux/slices/allJobs/selectors'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../redux/slices/allJobs/allJobsSlice'

export const ButtonContainerPage = () => {
  const { numOfPages, page } = useAppSelector(allJobsSelector)
  const dispatch = useAppDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const nextPage = () => {
    let pageNew = page + 1
    if (pageNew > numOfPages) {
      pageNew = 1
    }
    dispatch(changePage(pageNew))
  }

  const prevPage = () => {
    let pageNew = page - 1
    if (pageNew < 1) {
      pageNew = numOfPages
    }
    dispatch(changePage(pageNew))
  }

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map(numberPage => (
          <button
            key={page + Math.random()}
            type='button'
            className={numberPage === page ? 'pageBtn active' : 'pageBtn'}
            onClick={() => dispatch(changePage(numberPage))}
          >
            {numberPage}
          </button>
        ))}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
