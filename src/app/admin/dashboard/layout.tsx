import AdminAuthGuard from "./adminLayoutGuard";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex flex-col  bg-white dark:bg-gray-900 shadow-2xl  border border-gray-100 dark:border-gray-700 ">
        <Header />
        <div className="flex p-4 w-full ">
          <SideBar />
          <main className="flex-1 px-2">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
