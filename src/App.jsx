import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PageLoader from './components/common/PageLoader';
import ScrollProgress from './components/common/ScrollProgress';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GuestBook from './pages/GuestBook';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import BlogEditor from './pages/admin/BlogEditor';
import ProjectEditor from './pages/admin/ProjectEditor';

// Styles
import './styles/index.css';

// Page transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Admin Layout (no navbar/footer)
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
};

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/projects/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/blog/:id" element={<PageWrapper><BlogPost /></PageWrapper>} />
        <Route path="/guestbook" element={<PageWrapper><GuestBook /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/editor"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/editor/:id"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/project-editor"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <ProjectEditor />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/project-editor/:id"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <ProjectEditor />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Check if current route is admin
const useIsAdminRoute = () => {
  const location = useLocation();
  return location.pathname.startsWith('/admin');
};

// Main content wrapper that hides navbar/footer for admin
const MainContent = () => {
  const isAdmin = useIsAdminRoute();

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? "admin-main" : "main-content"}>
        <AnimatedRoutes />
      </main>
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            {/* Page Loader */}
            <PageLoader />

            {/* Scroll Progress */}
            <ScrollProgress />

            {/* Main Content */}
            <MainContent />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
