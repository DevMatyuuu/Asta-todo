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
      style={{ marginBottom: '2rem' }}
      checked={isDark}
      onChange={toggleDarkMode}
      size={40}
      className='absolute right-10 top-10'
    />
    </div>
  )
}

export default DarkModeToggle