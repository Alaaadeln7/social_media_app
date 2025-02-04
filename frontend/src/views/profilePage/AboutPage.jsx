import {
  Home,
  Users,
  PlaySquare,
  Store,
  UserCircle,
  Search,
  Bell,
  MessageCircle,
  Menu,
  Plus,
  Video,
  Image as ImageIcon,
  SmilePlus,
  MoreHorizontal,
  Heart,
  Share2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Gamepad2,
  Clock,
  Bookmark,
  Flag,
  Calendar,
  Users2,
  Globe,
  ThumbsUp,
} from "lucide-react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-16 pb-4">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr_360px] gap-4 px-4">
          {/* Main Feed */}
          <div className="max-w-[744px] mx-auto w-full space-y-4 py-4">
            {/* Stories */}
            <div className="flex space-x-2 overflow-x-auto pb-4">
              {/* Create Story */}
              <div className="relative flex-shrink-0 w-[150px] h-[250px] rounded-xl overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                  alt="Create Story"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white p-3">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-center mt-4 font-medium">Create Story</p>
                </div>
              </div>

              {/* User Stories */}
              {[1, 2, 3, 4].map((story) => (
                <div
                  key={story}
                  className="relative flex-shrink-0 w-[150px] h-[250px] rounded-xl overflow-hidden shadow-sm cursor-pointer"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1500000000000 + story
                    }?auto=format&fit=crop&q=80`}
                    alt={`Story ${story}`}
                    className="absolute inset-0 w-full h-full object-cover hover:transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60">
                    <div className="absolute top-4 left-4 ring-4 ring-blue-500 rounded-full">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          1500000000000 + story + 10
                        }?auto=format&fit=crop&q=80`}
                        alt={`User ${story}`}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <p className="absolute bottom-4 left-4 text-white font-medium">
                      User {story}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Post */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <button className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200">
                  What is on your mind, John?
                </button>
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                  <Video className="h-6 w-6 text-red-500" />
                  <span>Live Video</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                  <ImageIcon className="h-6 w-6 text-green-500" />
                  <span>Photo/Video</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                  <SmilePlus className="h-6 w-6 text-yellow-500" />
                  <span>Feeling/Activity</span>
                </button>
              </div>
            </div>

            {/* Posts */}
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white rounded-xl shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          1500000000000 + post + 20
                        }?auto=format&fit=crop&q=80`}
                        alt="User"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">User {post}</p>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <span>{post}h ago</span>
                          <span>•</span>
                          <Globe className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <button className="hover:bg-gray-100 p-2 rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="mt-4">This is a sample post {post}! 🎉</p>
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1500000000000 + post + 30
                    }?auto=format&fit=crop&q=80`}
                    alt="Post content"
                    className="mt-4 rounded-xl w-full"
                  />
                  <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-1">
                        <span className="bg-blue-500 p-1 rounded-full">
                          <ThumbsUp className="h-3 w-3 text-white" />
                        </span>
                        <span>{1234 + post}</span>
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <span>{123 + post} Comments</span>
                      <span>{12 + post} Shares</span>
                    </div>
                  </div>
                </div>
                <div className="border-t px-4 py-2">
                  <div className="flex space-x-1">
                    <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                      <ThumbsUp className="h-5 w-5" />
                      <span>Like</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                      <MessageCircle className="h-5 w-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-4 py-4">
            {/* Sponsored */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-500">Sponsored</h3>
              <div className="mt-4 space-y-4">
                {[1, 2].map((ad) => (
                  <a
                    key={ad}
                    href="#"
                    className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        1500000000000 + ad + 40
                      }?auto=format&fit=crop&q=80`}
                      alt={`Ad ${ad}`}
                      className="h-32 w-32 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">Sponsored Ad {ad}</p>
                      <p className="text-sm text-gray-500">website.com</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <hr />

            {/* Contacts */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-500">Contacts</h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Search className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((contact) => (
                  <button
                    key={contact}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          1500000000000 + contact + 50
                        }?auto=format&fit=crop&q=80`}
                        alt={`Contact ${contact}`}
                        className="h-9 w-9 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                    </div>
                    <span>User {contact}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
