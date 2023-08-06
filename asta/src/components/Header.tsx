import logo from '../assets/logo.png'

function Header() {
  return (
    <header>
        <div  className='flex md:ml-[152px] md:mt-20 h-20 w-28 ml-5 mt-5 text-start justify-between'>
              <img src={logo} alt='asta' width={150} height={100}/>
              <div className='absolute md:right-40 md:pt-5 right-6 pt-5'>
                dark mode
              </div>
        </div>
    </header>
  )
}

export default Header