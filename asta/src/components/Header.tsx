import logo from '../assets/logo.png'
import Lottie from 'lottie-react'
import DarkModeToggle from '../assets/switch.json'
import { useState } from 'react';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleClick = () => {
    setIsDarkMode((prevValue) => !prevValue);
  };

  return (
    <header>
        <div  className={`container ${isDarkMode ? 'flex md:ml-[152px] md:mt-12 md:h-24 h-20 ml-5 mt-5 md:mb-10 text-start justify-between bg-slate-600' : 'flex md:ml-[152px] md:mt-12 md:h-24 h-20 ml-5 mt-5 md:mb-10 text-start justify-between bg-white'}`}>
              <div className='md:h-20 md:mt-6'><img src={logo} alt='asta' className='md:h-28 md:w-36'/></div>
              <div className='flex md:w-[140px] absolute md:right-28 md:pt-0 right-6 pt-5'>
                <Lottie  
                  className='cursor-pointer'
                  onClick={handleToggleClick}
                  animationData={DarkModeToggle}
                />
              </div>
        </div>
    </header>
  )
}

export default Header