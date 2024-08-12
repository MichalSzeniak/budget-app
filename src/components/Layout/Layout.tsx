import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[60px_1fr] lg:grid-cols-[100px_1fr]">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
