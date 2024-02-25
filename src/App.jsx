import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import NotFound from "./components/NotFound/index.jsx";

import "antd/dist/reset.css";
import LayoutStaff from "./components/staff/LayoutStaff.jsx";
import StaffPage from "./pages/staff/index.jsx";
import Project from "./pages/projectManger/index.jsx";
const Layout = () => {
  return <>Main Page</>;
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/staff",
      element: <LayoutStaff />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <StaffPage />,
        },
        {
          path:"manager",
          element: <Project/>
        },
        {
          path:"upload-document",
          element: <>Tải đề tài lên</>
        },
        {
          path:"infor",
          element: <>Thông tin cá nhân</>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
