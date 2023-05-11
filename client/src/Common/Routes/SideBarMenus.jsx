import {
  HomeOutlined,
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
  Map,
  TableChart,
} from "@mui/icons-material";

const AdminMenus = [
  {
    text: "Dashboard",
    path: "/auth/home",
    icon: <HomeOutlined />,
  },
  {
    text: "Department",
  },
  {
    text: "Complaints",
    path: "/auth/complaints",
    icon: <ContentPaste />,
    children: [
      {
        text: "Table View",
        path: "/auth/complaints",
        icon: <TableChart />,
      },
      {
        text: "Map View",
        path: "/auth/mapcomplaints",
        icon: <Map />,
      },
    ],
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
    children: [
      {
        text: "Table View",
        path: "/auth/tasks",
        icon: <TableChart />,
      },
      {
        text: "Map View",
        path: "/auth/maptasks",
        icon: <Map />,
      },
    ],
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
    path: "/auth/home",
    icon: <HomeOutlined />,
  },
  {
    text: "Views",
  },
  {
    text: "General Complaints",
    path: "/auth/generalcomplaints",
    icon: <Public />,
    children: [
      {
        text: "Table View",
        path: "/auth/generalcomplaints",
        icon: <TableChart />,
      },
      {
        text: "Map View",
        path: "/auth/mapgeneralcomplaints",
        icon: <Map />,
      },
    ],
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
    path: "/auth/home",
    icon: <HomeOutlined />,
  },
  {
    text: "Views",
  },
  {
    text: "General Complaints",
    path: "/auth/generalcomplaints",
    icon: <Public />,
    children: [
      {
        text: "Table View",
        path: "/auth/generalcomplaints",
        icon: <TableChart />,
      },
      {
        text: "Map View",
        path: "/auth/mapgeneralcomplaints",
        icon: <Map />,
      },
    ],
  },
  {
    text: "Complaints",
    path: "/auth/complaints",
    icon: <ContentPaste />,
    children: [
      {
        text: "Table View",
        path: "/auth/complaints",
        icon: <TableChart />,
      },
      {
        text: "Map View",
        path: "/auth/mapcomplaints",
        icon: <Map />,
      },
    ],
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
