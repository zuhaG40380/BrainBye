import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import CreatePage from './pages/CreatePage'
import QuizzesPage from './pages/QuizzesPage'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain relative min-h-screen bg-void">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <LandingPage />
            </AppLayout>
          }
        />
        <Route
          path="/create"
          element={
            <AppLayout>
              <CreatePage />
            </AppLayout>
          }
        />
        <Route
          path="/quizzes"
          element={
            <AppLayout>
              <QuizzesPage />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
