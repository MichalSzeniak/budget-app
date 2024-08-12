import { Home, LineChart, WalletMinimal } from "lucide-react";
import { Link, matchPath } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navigation = () => {
  const match = (link: string) => matchPath(link, location.pathname);
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
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(match(item.href) && "bg-muted", "rounded-lg ")}
                  aria-label="Playground"
                  asChild
                >
                  <Link to={item.href}>{item.icon}</Link>
                </Button>
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
