import './views/style.css'

import UserRoutes from './routes/user routes'
import AdminRoutes from './routes/admin routes'

import Nav from './views/components/nav'
import Footer from './views/components/footer'

function App() {
  return (
    <>
      <Nav />

      <main className="min-h-[calc(100vh-200px)]">
        <UserRoutes />
        <AdminRoutes />
      </main>

      <Footer />
    </>
  )
}

export default App
