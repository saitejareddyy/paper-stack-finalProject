import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import UploadSubject from './pages/UploadSubject'
import SubjectDetails from './pages/SubjectDetails'
import { Toaster } from 'react-hot-toast'


export const backendUrl = 'http://localhost:5050' 

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage /> } />
        <Route path='/upload/subject' element={<UploadSubject /> } />
        <Route path='/subject/:id' element={<SubjectDetails /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
