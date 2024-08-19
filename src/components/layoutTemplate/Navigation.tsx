import { Home, LineChart, WalletMinimal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navigation = () => {
  const navLinks = [
    {
      name: "Dashboard",
      href: "",
      icon: <Home />,
    },
    {
      name: "Analysis",
      href: "analysys",
      icon: <LineChart />,
    },
  ];

  return (
    <aside className="hidden sm:flex items-center h-full flex-col border-r">
      <div className="flex items-center border-b px-4 h-[60px] lg:px-6">
        <div className="flex items-center font-bold relative w-12">
          <div className="bg-sky-300 absolute w-5 h-5 -left-2 -top-0 rounded" />
          <div className="bg-yellow-100 absolute w-5 h-5 left-3 -bottom-1 rounded" />
          <WalletMinimal className="h-6 w-6 z-10" />
          <span className="z-10">HB</span>
        </div>
      </div>
      <nav className="flex flex-col gap-2 py-8">
        <TooltipProvider delayDuration={0}>
          {navLinks.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <NavLink to={item.href}>
                  {({ isActive }) => (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={item.name}
                      className={isActive ? "bg-muted" : ""}
                    >
                      {item.icon}
                    </Button>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
};
export default Navigation;
