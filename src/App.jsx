import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddJob from './pages/AddJob'
import JobList from './pages/JobList'
import Header from './components/Header'

const App = () => {
  return (
<BrowserRouter>
<Header/>
<Routes>
  <Route path="/" element={<JobList/>} />
  <Route path="/add" element={<AddJob/>} />
</Routes>

</BrowserRouter>
  )
}

export default App