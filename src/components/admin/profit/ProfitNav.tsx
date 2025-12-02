import { Link, useLocation } from "react-router-dom";
import { Calculator, BarChart3, Settings, ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";

export function ProfitNav() {
  const location = useLocation();

  const navItems = [
    {
      path: "/admin/profit/calculator",
      label: "Calculator",
      icon: Calculator,
    },
    {
      path: "/admin/profit/dashboard",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      path: "/admin/profit/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Link to="/admin">
          <Button variant="ghost" size="icon" className="border border-gray-300">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-semibold text-black">Profit Calculator</h2>
          <p className="text-sm text-gray-500">Business profit analysis tool</p>
        </div>
      </div>
      <nav className="flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "outline"}
                className={
                  isActive
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border-gray-300"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

