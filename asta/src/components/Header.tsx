import logo from '../assets/logo.png'
import logowhite from '../assets/logowhite.png'
import { useDarkModeStore } from '../store/DarkModeStore'
import DarkModeToggle from './DarkModeToggle'

function Header() {
  const isDark =useDarkModeStore((state) => state.isDark)
  return (
    <header className={isDark ? 'bg-[#020403]' : ''}>
        <div className='flex md:ml-[152px] md:pt-16 md:mt-0 md:pb-16 mb-5 pt-0 h-20 w-28 ml-5 mt-0 md:mb-10 text-start justify-between'>
              <div className='md:mt-0 mt-10 md:ml-0 ml-2'>
                <img src={!isDark ? logo : logowhite}  alt='asta' className='h-14 md:h-28 md:w-32 max-w-[500px]'/>
              </div>
              <div className='absolute md:right-32 right-6 top-6'>
                <DarkModeToggle />
              </div>
        </div>
    </header>
  )
}

export default Header