import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import ArticlesManagement from "./pages/ArticlesManagement";
import ArticleDetail from "./pages/ArticleDetail";
import CommentsManagement from "./pages/CommentsManagement";
import MediaManagement from "./pages/MediaManagement";
import TopBar from "./components/TopBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ProtectedRoute>
            <TopBar />
            <Routes>
              <Route path="/" element={<Navigate to="/messages" replace />} />
              <Route path="/messages" element={<Dashboard />} />
              <Route path="/articles" element={<ArticlesManagement />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/comments" element={<CommentsManagement />} />
              <Route path="/media" element={<MediaManagement />} />
            </Routes>
          </ProtectedRoute>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
