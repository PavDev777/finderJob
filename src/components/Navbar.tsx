import classes from 'classnames'
import { useState } from 'react'
import {
  FaAlignLeft,
  FaCaretDown,
  FaCaretUp,
  FaUserCircle
} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/user/selectors'
import { clearStoreThunks, sidebarToggle } from '../redux/slices/user/userSlice'

export const Navbar = () => {
  const [isLogOut, setIsLogOut] = useState(false)
  const { user } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()

  const dropdown = classes('dropdown', {
    'show-dropdown': isLogOut
  })

  const toggle = () => {
    dispatch(sidebarToggle())
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <h3 className='logo-text'>dashboard</h3>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setIsLogOut(!isLogOut)}
          >
            <FaUserCircle />
            {user?.name}
            {isLogOut ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          <div className={dropdown}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(clearStoreThunks())}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
