import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDarkModeStore } from '../store/DarkModeStore';

function DarkModeToggle() {
    const [isDark, setDark,] = useDarkModeStore((state) => [state.isDark, state.setDark] )

  const toggleDarkMode = (checked: boolean) => {
    setDark(checked);
  };
  return (
    <div>
      <DarkModeSwitch
      checked={isDark}
      onChange={toggleDarkMode}
      size={40}
      className='absolute w-5 right-1 md:right-6 top-10'
    />
    </div>
  )
}

export default DarkModeToggle