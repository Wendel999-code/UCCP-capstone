import Nav from "./components/nav";
import Sidebar from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col ">
      {/* header */}
      <Nav />
      <div className="flex px-32 py-6">
        {/* Sidebar */}

        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 bg-white">{children}</main>
      </div>
    </div>
  );
}
