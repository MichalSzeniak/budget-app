import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[1fr] sm:grid-cols-[100px_1fr]">
      <Navigation />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
