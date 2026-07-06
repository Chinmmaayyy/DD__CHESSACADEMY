import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { LearnLayout } from '@/layouts/LearnLayout'
import { HomePage } from '@/pages/HomePage'

// Learn platform is code-split — chess.js / react-chessboard load only on /learn.
const LearnHub = lazy(() =>
  import('@/pages/learn/LearnHub').then((m) => ({ default: m.LearnHub })),
)
const InteractiveBoardPage = lazy(() =>
  import('@/pages/learn/InteractiveBoardPage').then((m) => ({
    default: m.InteractiveBoardPage,
  })),
)
const PlayVsAIPage = lazy(() =>
  import('@/pages/learn/PlayVsAIPage').then((m) => ({ default: m.PlayVsAIPage })),
)
const PuzzleTrainerPage = lazy(() =>
  import('@/pages/learn/PuzzleTrainerPage').then((m) => ({ default: m.PuzzleTrainerPage })),
)
const PuzzleLibraryPage = lazy(() =>
  import('@/pages/learn/PuzzleLibraryPage').then((m) => ({ default: m.PuzzleLibraryPage })),
)
const BlogListPage = lazy(() =>
  import('@/pages/blog/BlogListPage').then((m) => ({ default: m.BlogListPage })),
)
const BlogPostPage = lazy(() =>
  import('@/pages/blog/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)
const GalleryPage = lazy(() =>
  import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })),
)

/** Reset scroll on route change (but keep in-page hash anchors working). */
function ScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function LearnFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-white/50">
      <Loader2 className="size-8 animate-spin text-gold-400" />
    </div>
  )
}

function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-canvas px-6 text-center">
      <div>
        <p className="font-display text-6xl font-semibold text-heading">404</p>
        <p className="mt-3 text-muted">This page has moved off the board.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-gold-500 px-6 py-3 font-semibold text-navy-900"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollReset />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="blog"
            element={
              <Suspense fallback={<LearnFallback />}>
                <BlogListPage />
              </Suspense>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={<LearnFallback />}>
                <BlogPostPage />
              </Suspense>
            }
          />
          <Route
            path="gallery"
            element={
              <Suspense fallback={<LearnFallback />}>
                <GalleryPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/learn"
          element={
            <Suspense fallback={<LearnFallback />}>
              <LearnLayout />
            </Suspense>
          }
        >
          <Route index element={<LearnHub />} />
          <Route path="puzzles" element={<PuzzleTrainerPage />} />
          <Route path="library" element={<PuzzleLibraryPage />} />
          <Route path="play" element={<PlayVsAIPage />} />
          <Route path="board" element={<InteractiveBoardPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
