import React from "react";
import { GoHome } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LuServer } from "react-icons/lu";
import { useAppContext } from "../../context/useAppContext";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/educator/dashboard",
    icon: <GoHome />,
  },
  {
    name: "Add Course",
    path: "/educator/add-course",
    icon: <MdAddCircleOutline />,
  },
  {
    name: "My Courses",
    path: "/educator/my-courses",
    icon: <LuServer />,
  },
  {
    name: "Students Enrolled",
    path: "/educator/students-enrolled",
    icon: <FiUsers />,
  },
];

const Sidebar: React.FC = () => {
  const { isEducator } = useAppContext();
  return (
    isEducator && (
      <aside className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 pt-10 space-y-2 flex flex-col transition-all duration-300">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={`${
              item.path === window.location.pathname
                ? "bg-blue-500/30 border-r-4 border-blue-500"
                : ""
            } flex items-center gap-4 cursor-pointer hover:bg-blue-300/30 py-3 px-4`}
          >
            <div className="text-2xl">{item.icon}</div>
            <span className="md:block hidden">{item.name}</span>
          </NavLink>
        ))}
      </aside>
    )
  );
};

export default Sidebar;
