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
      className='flex h-7'
    />
    </div>
  )
}

export default DarkModeToggle