import { LayoutDashboard, Package, Warehouse } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="bg-slate-50 min-h-screen md:flex text-slate-900">
      <aside className="w-full border-b border-slate-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Warehouse size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">StockPilot</h1>
            <p className="text-xs text-slate-500">Inventory Managment</p>
          </div>
        </div>
        <nav className="flex gap-2 md:flex-col">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-slate-600 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-slate-600 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <Package size={18} />
            Productos
          </NavLink>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <p>Panel de administracion</p>
          <div className="bg-slate-100 rounded-full text-sm font-semibold tracking-tight h-10 w-10 flex items-center justify-center">
            SP
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
