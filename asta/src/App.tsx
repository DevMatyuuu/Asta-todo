import Board from './components/Board'
import Header from './components/Header'
import { useDarkModeStore } from './store/DarkModeStore'


function App() {
 const isDark = useDarkModeStore((state) => state.isDark)

  return (
    <div className={isDark ? 'bg-black h-screen' : ''}>
        <Header />
        <Board />
    </div>
  )
}

export default App
