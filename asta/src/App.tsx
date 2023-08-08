import Board from './components/Board'
import Header from './components/Header'
import { useDarkModeStore } from './store/DarkModeStore'


function App() {
 const isDark = useDarkModeStore((state) => state.isDark)

  return (
    <div className={isDark ? 'bg-[#020403] h-screen overflow-hidden' : ''}>
        <Header />
        <Board />
    </div>
  )
}

export default App
