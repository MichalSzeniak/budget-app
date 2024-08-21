import { Home, LineChart, PanelLeft, WalletMinimal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
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
    <header className="flex items-center gap-4 border-b bg-muted/40 px-4 h-[60px] lg:px-6">
      <div className="w-full flex-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center font-bold relative w-12">
                    <div className="bg-sky-300 absolute w-5 h-5 -left-2 -top-0 rounded" />
                    <div className="bg-yellow-100 absolute w-5 h-5 left-3 -bottom-1 rounded" />
                    <WalletMinimal className="h-6 w-6 z-10" />
                    <span className="z-10">HB</span>
                  </div>
                </SheetTitle>
                <SheetDescription aria-hidden></SheetDescription>
              </SheetHeader>

              {navLinks.map((item) => (
                <NavLink to={item.href}>
                  {({ isActive }) => (
                    <Button
                      variant="ghost"
                      aria-label={item.name}
                      className={cn(
                        "flex justify-start gap-4 px-2.5 text-muted-foreground hover:text-foreground w-full",
                        isActive ? "text-black bg-muted" : ""
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  )}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default Header;
