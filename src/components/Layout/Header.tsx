import { Home, LineChart, PanelLeft, WalletMinimal } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";

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
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
              <div className="flex items-center font-bold relative w-12">
                <div className="bg-sky-300 absolute w-5 h-5 -left-2 -top-0 rounded" />
                <div className="bg-yellow-100 absolute w-5 h-5 left-3 -bottom-1 rounded" />
                <WalletMinimal className="h-6 w-6 z-10" />
                <span className="z-10">HB</span>
              </div>
              {navLinks.map((item) => (
                <Link
                  to={item.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default Header;
