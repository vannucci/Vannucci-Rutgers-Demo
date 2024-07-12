import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'

import { SplashPage } from './routes/SplashPage'
import { Classes } from './routes/Classes'
import { Students } from './routes/Students'
import { StudentClassData } from './routes/StudentClassData'
import TopNav from './components/TopNav'

function App() {

  return (
	<BrowserRouter>
		<TopNav>
			<Routes>
				<Route index element={<SplashPage />} />
				<Route path="/students" element={<Students />} />
				<Route path="/classes" element={<Classes />} />
				<Route path="/studentClassData/:id" element={<StudentClassData />} />
			</Routes>
		</TopNav>
	</BrowserRouter>
  )
}

export default App
