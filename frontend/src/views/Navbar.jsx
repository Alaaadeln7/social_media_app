import { Link, useNavigate } from "react-router-dom";
import { useCheckQuery, useLogoutMutation } from "../store/api/authApiSlice";
import { Bell, Loader2, LogOut, MessageCircle, Settings } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: user, isLoading: isUserLoading } = useCheckQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data.status == "SUCCESS") {
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error(error);
    }
  };

  if (isUserLoading)
    return (
      <div>
        <Loader2 />
      </div>
    );
  if (!user) return null;

  return (
    <header className="shadow-sm fixed w-full top-0 z-50 backdrop-blur-lg bg-base-100/80">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 py-2">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl uppercase">
            <Link to={"/"}>logo</Link>
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-2">
          <details className="dropdown">
            <summary className="btn bg-transparent outline-none border-none hover:bg-transform m-1">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.avatar}
                alt={user.fullName}
              />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <Link
                  to={"/profile"}
                  className="flex justify-between items-center"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.fullName}
                  />
                  <p>{user.fullName}</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex justify-between items-center gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex justify-between items-center gap-2 transition-colors"
                >
                  {isLoggingOut ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </details>
          <Link
            to={"/messenger"}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link to={"/"} className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
