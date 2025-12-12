
import React from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { MangaProvider } from './contexts/MangaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { MangaDetail } from './pages/MangaDetail';
import { Profile } from './pages/Profile';
import { Upload } from './pages/Upload';
import { Pricing } from './pages/Pricing';
import { Categories } from './pages/Categories';
import { AuthPage } from './pages/AuthPage';
import { AuthorHub } from './pages/AuthorHub';
import { ProjectFunding } from './pages/ProjectFunding';
import { InfoPage } from './pages/InfoPage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isReader = location.pathname.includes('/reader'); 
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Hide Navbar/Footer on Reader AND Auth pages for clean look
  const hideChrome = isReader || isAuthPage;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MangaProvider>
        <LanguageProvider>
          <MemoryRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/manga/:id" element={<MangaDetail />} />
                <Route path="/reader/:id/:chapterId" element={<Reader />} />
                <Route path="/reader/:id" element={<Reader />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/authors" element={<AuthorHub />} />
                <Route path="/project/:id" element={<ProjectFunding />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </MemoryRouter>
        </LanguageProvider>
      </MangaProvider>
    </AuthProvider>
  );
};

export default App;
