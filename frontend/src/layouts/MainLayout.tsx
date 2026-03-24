import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 text-2xl font-bold">Ubuntu Nexus</div>
        <nav className="mt-10">
          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">Home</Link>
          <Link to="/objectives" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">Objectives</Link>
          <Link to="/articles" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">Articles</Link>
        </nav>
      </div>
      <div className="flex flex-col flex-1">
        <header className="p-4 bg-white shadow-md">
          <div className="flex items-center justify-end">
            <Link to="/login" className="px-4 py-2 text-gray-600 hover:bg-gray-200">Login</Link>
            <Link to="/register" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Register</Link>
          </div>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
