import { useCheckQuery } from "./store/api/authApiSlice";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignupPage from "./views/auth/SignupPage";
import HomePage from "./views/home/HomePage";
import { useEffect, useMemo } from "react";
import LoginPage from "./views/auth/LoginPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./components/NotFoundPage";
import Profile from "./views/profilePage/Profile";
import ProfileContent from "./views/profilePage/ProfileContent";
import AboutPage from "./views/profilePage/AboutPage";
import Settings from "./views/settings/SettingsPage";
import ProfileAbout from "./views/profilePage/ProfileAbout";
import ProfileFriends from "./views/profilePage/ProfileFriends";
import ProfilePhoto from "./views/profilePage/ProfilePhoto";
import CreatePost from "./views/posts/CreatePost";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import ChatPage from "./views/chat/ChatPage";
import { socketConnection, socketDisconnection } from "./utils/socket";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { theme } = useSelector((state) => state.theme);
  const { data: user, isLoading  } = useCheckQuery();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!isLoading) {
      switch (!user) {
        case "/login":
          navigate("/login");
          break;
        case "/signup":
          navigate("/signup");
      }
      if (user) {
        socketConnection();
      } else {
        socketDisconnection();
      }
    }
  }, [user, isLoading, navigate]);
  const currentUser = useMemo(() => user, [user]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <main data-theme={theme} className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!currentUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={currentUser}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<ProfileContent />} />
          <Route path="about/*" element={<ProfileAbout />} />
          <Route path="friends" element={<ProfileFriends />} />
          <Route path="photos" element={<ProfilePhoto />} />
        </Route>

        <Route
          path="/about-page"
          element={
            <ProtectedRoute user={currentUser}>
              <AboutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/*"
          element={
            <ProtectedRoute user={currentUser}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute user={currentUser}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messenger"
          element={
            <ProtectedRoute user={currentUser}>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </main>
  );
}
