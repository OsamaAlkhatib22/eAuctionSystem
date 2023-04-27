import {
  HomeOutlined,
  InsertDriveFileOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  AssignmentIndOutlined,
  AssessmentOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  Domain,
  PieChartOutlined,
  DisplaySettingsOutlined,
  Public,
  ContentPaste,
} from "@mui/icons-material";

const AdminMenus = [
  {
    text: "Dashboard",
    path: "/auth/dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Department",
  },
  {
    text: "Complaints",
    path: "/auth/complaints",
    icon: <ContentPaste />,
  },
  {
    text: "Workers",
    path: "/auth/workers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Tasks",
    path: "/auth/tasks",
    icon: <AssignmentIndOutlined />,
  },
  {
    text: "History",
    path: "/auth/history",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Statistics",
  },
  {
    text: "Overview",
    path: "/auth/overview",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Daily",
    path: "/auth/daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    path: "/auth/monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    path: "/auth/breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
  },
  {
    text: "Departments",
    path: "/auth/departments",
    icon: <Domain />,
  },
  {
    text: "App Settings",
    path: "/auth/appsettings",
    icon: <DisplaySettingsOutlined />,
  },
];

const WorkerMenus = [
  {
    text: "Dashboard",
    path: "/auth/dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Views",
  },
  {
    text: "General Complaints",
    path: "/auth/complaints",
    icon: <Public />,
  },
  {
    text: "Tasks",
    path: "/auth/tasks",
    icon: <AssignmentIndOutlined />,
  },
];

const UserMenus = [
  {
    text: "Public Forum",
    path: "/auth/forum",
    icon: <HomeOutlined />,
  },
  {
    text: "Views",
  },
  {
    text: "General Complaints",
    path: "/auth/complaints",
    icon: <Public />,
  },
  {
    text: "Complaints",
    path: "/auth/complaints",
    icon: <ContentPaste />,
  },
];

export default function GetMenus(userType) {
  switch (userType) {
    case "admin":
      return AdminMenus;
    case "worker":
      return WorkerMenus;
    case "user":
      return UserMenus;
    default:
      return UserMenus;
  }
}
