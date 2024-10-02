import { LuLayoutDashboard } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbFileCv } from "react-icons/tb";
import { FiUserCheck } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { PiGearSix } from "react-icons/pi";

export const nav_items = [
  { section_title: "General" },
  {
    title: "Dashboard",
    path: "/",
    icon: LuLayoutDashboard,
  },
  {
    title: "Job Applications",
    path: "/job-applications",
    icon: IoBriefcaseOutline,
  },
  {
    title: "Candidates",
    path: "/candidates",
    icon: TbFileCv,
  },
  {
    title: "Short Listed",
    path: "/short-listed",
    icon: FiUserCheck,
  },
  { section_title: "Others" },
  {
    title: "Help Center",
    path: "/help-center",
    icon: GoQuestion,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: PiGearSix,
  },
];
