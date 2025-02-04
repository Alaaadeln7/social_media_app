import { Link, Route, Routes } from "react-router-dom";
import WorkAndEduction from "./profileAbout/WorkAndEduction";
import AboutPlaces from "./profileAbout/AboutPlaces";
import AboutCalls from "./profileAbout/AboutCalls";
import AboutFamily from "./profileAbout/AboutFamily";

export default function ProfileAbout() {
  return (
    <div className="flex">
      <div className="border-r-2 pr-5">
        <h1 className="text-2xl font-bold text-gray-800">About</h1>
        <ul className="flex flex-col gap-3 mt-5">
          <li>
            <Link
              to="/profile/about/general"
              className="text-gray-600 hover:text-gray-800"
            >
              General
            </Link>
          </li>
          <li>
            <Link
              to="/profile/about/work_and_eduction"
              className="text-gray-600 hover:text-gray-800"
            >
              Work and Education
            </Link>
          </li>
          <li>
            <Link
              to="/profile/about/spaces"
              className="text-gray-600 hover:text-gray-800"
            >
              Spaces
            </Link>
          </li>
          <li>
            <Link
              to="/profile/about/calls"
              className="text-gray-600 hover:text-gray-800"
            >
              Calls
            </Link>
          </li>
          <li>
            <Link
              to="/profile/about/family"
              className="text-gray-600 hover:text-gray-800"
            >
              Family
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="work_and_eduction" element={<WorkAndEduction />} />
          <Route path="spaces" element={<AboutPlaces />} />
          <Route path="calls" element={<AboutCalls />} />
          <Route path="family" element={<AboutFamily />} />
        </Routes>
      </div>
    </div>
  );
}
