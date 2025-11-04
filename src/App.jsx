// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SortingVisualizer from './components/SortingVisualizer.jsx'

function App() {
  return (
    <div className='app'>   
       <SortingVisualizer/>
      <footer className="mt-22 bottom-4 w-full text-center text-sm text-gray-500">
        made with ❤️ by <span className="font-semibold text-gray-700">Anubhav Pathak</span>
      </footer>

    </div>
  )
}

export default App
