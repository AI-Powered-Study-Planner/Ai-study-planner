import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import StudyTracker from './pages/StudyTracker';
import Subjects from './pages/Subjects';
import CalendarPlanner from './pages/CalendarPlanner';
import AIAssistant from './pages/AIAssistant';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';

// ─────────────────────────────────────────
// PROTECTED ROUTE
// checks if token exists in localStorage
// if yes → show the page
// if no → redirect to login
// ─────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// ─────────────────────────────────────────
// PUBLIC ROUTE
// if already logged in → redirect to dashboard
// if not logged in → show auth pages
// ─────────────────────────────────────────
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES — only for non logged in users */}
        <Route element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* GOOGLE AUTH SUCCESS — special page, no layout needed */}
        <Route path="/auth/success" element={<GoogleAuthSuccess />} />

        {/* PROTECTED ROUTES — only for logged in users */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/study" element={<StudyTracker />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/planner" element={<CalendarPlanner />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
        </Route>

        {/* CATCH ALL — any unknown URL goes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;