import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Oops Something's broken 😓
            </h1>
            <p className="text-sm text-muted-foreground">
              The page you tried to access does not exist.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/">Home page</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
