
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import LayoutStaff from "./pages/staff/LayoutStaff.jsx";
import "antd/dist/reset.css"
const Layout = () => {
  return <>Main Page</>;
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound/>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path:"/staff",
      element: <LayoutStaff/>,
      errorElement: <NotFound/>
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
