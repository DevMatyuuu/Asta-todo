import Lottie from 'lottie-react'
import DarkMode from '../assets/switch.json'

function DarkModeToggle() {
  return (
    <div className='flex relative h-32 right-[-20px]'>
        <Lottie 
            animationData={DarkMode}
            loop={false}
            />
    </div>
  )
}

export default DarkModeToggle