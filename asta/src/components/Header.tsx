import logo from '../assets/logo.png';
import logowhite from '../assets/logowhite.png';
import { useDarkModeStore } from '../store/DarkModeStore';
import DarkModeToggle from './DarkModeToggle';

function Header() {
  const isDark = useDarkModeStore((state) => state.isDark);
  return (
    <header className={`flex justify-center pt-10 sm:pt-10px lg:pt-16 xl:pt-16 ${isDark ? 'bg-[#020403]' : ''}`}>
      <div className='flex items-center justify-between max-w-[1400px] w-full px-5 sm:px-5'>
        <img src={!isDark ? logo : logowhite} alt="asta" className="h-14 lg:h-24 lg:w-28" />
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;




