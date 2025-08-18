import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/home";
import Footer from "./components/Footer";
import Sign from "./components/Sign";
import About from "./components/About";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import "../src/index.css";
import AdminJobPosting from "./components/AdminJobPosting";
<<<<<<< HEAD
=======
import AdminLogin from "./components/AdminLogin";
import AdminManagement from "./components/AdminManagement";
import ApplicationManagement from "./components/ApplicationManagement";
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> origin/job-fetching-fix
import JobsPage from "./components/jobs";

function App() {
  return (
    <Router>
      <div className="app-container">
<<<<<<< HEAD
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Sign />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/admin-job-posting" element={<AdminJobPosting />} />
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </main>
        <Footer />
=======
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/signin" element={
            <>
              <Header />
              <main className="main-content">
                <Sign />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <main className="main-content">
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="main-content">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header />
              <main className="main-content">
                <StudentProfile />
              </main>
              <Footer />
            </>
          } />
          <Route path="/jobs" element={
            <>
              <Header />
              <main className="main-content">
                <JobsPage />
              </main>
              <Footer />
            </>
          } />
          
          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-job-posting" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminJobPosting />
            </ProtectedRoute>
          } />
          <Route path="/application-management" element={
            <ProtectedRoute requireAdmin={true}>
              <ApplicationManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin-management" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminManagement />
            </ProtectedRoute>
          } />
        </Routes>
>>>>>>> origin/job-fetching-fix
      </div>
    </Router>
  );
}

export default App;