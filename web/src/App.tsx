import { Link, Route, Routes, useParams } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { BedroomPage } from './pages/BedroomPage'
import { homeSectionTo } from './lib/paths'

function BedroomRoute() {
  const { slug } = useParams()
  return <BedroomPage slug={slug ?? ''} />
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-ink focus:shadow-lg"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
      <Route
        path="/chambres/:slug"
        element={
          <AppLayout>
            <BedroomRoute />
          </AppLayout>
        }
      />
      <Route
        path="*"
        element={
          <AppLayout>
            <div className="mx-auto max-w-content px-4 py-32 text-center">
              <h1 className="font-display text-2xl font-semibold text-brand-ink">Page introuvable</h1>
              <Link
                to={homeSectionTo('#accueil')}
                className="mt-6 inline-block text-brand-accent hover:underline"
              >
                Retour à l’accueil
              </Link>
            </div>
          </AppLayout>
        }
      />
    </Routes>
  )
}
