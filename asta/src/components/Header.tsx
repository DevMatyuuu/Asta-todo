import logo from '../assets/logo.png'
import DarkModeToggle from './DarkModeToggle'

function Header() {
  return (
    <header>
        <div  className='flex md:ml-[152px] md:mt-16 h-20 w-28 ml-5 mt-5 md:mb-10 text-start justify-between'>
              <div className='md:mt-7'>
                <img src={logo} alt='asta' width={150} height={100}/>
              </div>
              <div className='absolute md:right-32 right-6'>
                <DarkModeToggle />
              </div>
        </div>
    </header>
  )
}

export default Header