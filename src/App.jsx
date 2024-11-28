import { useState } from 'react'
import Landing from '../components/Landing'
import '../styles/App.css'

function App() {



  return (
    <>
      {<Landing handleClick={startQuestions} />}
    </>
  )
}

export default App
