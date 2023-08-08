import logo from '../assets/logo.png'
import logowhite from '../assets/logowhite.png'
import { useDarkModeStore } from '../store/DarkModeStore'
import DarkModeToggle from './DarkModeToggle'

function Header() {
  const isDark =useDarkModeStore((state) => state.isDark)
  return (
    <header className={isDark ? 'bg-[#020403]' : ''}>
        <div className='flex md:ml-[152px] md:pt-16 md:mt-0 md:pb-16 mb-10 pt-5 h-20 w-28 ml-5 mt-0 md:mb-10 text-start justify-between'>
              <div className='md:mt-7 mt-7'>
                <img src={!isDark ? logo : logowhite}  alt='asta' width={150} height={100}/>
              </div>
              <div className='absolute md:right-32 right-6'>
                <DarkModeToggle />
              </div>
        </div>
    </header>
  )
}

export default Header