import { Home, LineChart, WalletMinimal } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navigation = () => {
  const data = [
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
    <aside className="flex items-center h-full flex-col border-r">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <WalletMinimal className="h-6 w-6" />
          <span className="">HB</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 py-8">
        <TooltipProvider delayDuration={0}>
          {data.map((item) => (
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
