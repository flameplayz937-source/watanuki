import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useSidebarStore from "./store/sidebarStore";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ScrollToTop from "./utils/ScrollToTop";
import SearchResult from "./pages/SearchResult";
import WatchPage from "./pages/WatchPage";
import PageNotFound from "./pages/PageNotFound";
import PeopleInfoPage from "./pages/PeopleInfoPage";
import CharacterInfoPage from "./pages/CharacterInfoPage";
import CharactersPage from "./pages/CharactersPage";

const App = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const togglesidebar = useSidebarStore((state) => state.toggleSidebar);
  const location = useLocation();
  const path = location.pathname === "/";

  const [authPage, setAuthPage] = useState(null); // null, 'login', or 'register'

  return (
    <>
      {/* Sidebar */}
      {!path && <Sidebar />}

      {/* Login/Register Buttons in the top-right corner */}
      <div style={styles.authNav}>
        <button
          onClick={() => setAuthPage("login")}
          style={{
            ...styles.authButton,
            backgroundColor: authPage === "login" ? "#4f46e5" : "#6b7280",
          }}
        >
          Login
        </button>
        <button
          onClick={() => setAuthPage("register")}
          style={{
            ...styles.authButton,
            backgroundColor: authPage === "register" ? "#4f46e5" : "#6b7280",
          }}
        >
          Register
        </button>
      </div>

      <main className={`${isSidebarOpen ? "bg-active" : ""} opacityWrapper`}>
        <div
          onClick={togglesidebar}
          className={`${isSidebarOpen ? "active" : ""} opacityBg`}
        ></div>
        {!path && <Header />}
        <ScrollToTop />

        {/* Conditionally render Login/Register forms */}
        {authPage === "login" && (
          <div style={styles.authFormOverlay}>
            <div style={styles.authForm}>
              <h2>Login</h2>
              <input type="text" placeholder="Username" style={styles.input} />
              <input type="password" placeholder="Password" style={styles.input} />
              <button style={styles.submit}>Login</button>
              <button
                onClick={() => setAuthPage(null)}
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {authPage === "register" && (
          <div style={styles.authFormOverlay}>
            <div style={styles.authForm}>
              <h2>Register</h2>
              <input type="text" placeholder="Username" style={styles.input} />
              <input type="email" placeholder="Email" style={styles.input} />
              <input type="password" placeholder="Password" style={styles.input} />
              <button style={styles.submit}>Register</button>
              <button
                onClick={() => setAuthPage(null)}
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<Home />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route path="/animes/:category/:query?" element={<ListPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/characters/:id" element={<CharactersPage />} />
          <Route path="/people/:id" element={<PeopleInfoPage />} />
          <Route path="/character/:id" element={<CharacterInfoPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
};

const styles = {
  authNav: {
    position: "fixed",
    top: 20,
    right: 20,
    display: "flex",
    gap: "12px",
    zIndex: 1000,
  },
  authButton: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  authFormOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
  },
  authForm: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  submit: {
    padding: "0.7rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  closeButton: {
    marginTop: "0.5rem",
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default App;
