import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { DiagonalTimeline } from './routes/DiagonalTimeline';
import './style.css';

const routes = [
  { path: '/', label: 'Diagonal Timeline', element: <DiagonalTimeline /> },
  // { path: '/fan', label: 'Fan Showcase', element: <FanShowcase /> },
];

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-900 text-white'>
        <header className='sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-white/10'>
          <nav className='max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 justify-between'>
            <span className='text-lg font-semibold tracking-tight text-white'>
              Capture Moments
            </span>
            <div className='flex gap-2 text-sm font-medium'>
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition border border-white/10 ${
                      isActive
                        ? 'bg-white text-slate-900'
                        : 'text-white/80 hover:text-white hover:border-white/40'
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </header>

        <main className='relative'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path='*' element={<DiagonalTimeline />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
