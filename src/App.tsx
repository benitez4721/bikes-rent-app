import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppSwitcher from './routes/AppSwitcher'
import { AuthProvider } from './context/AuthContext/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppSwitcher />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
