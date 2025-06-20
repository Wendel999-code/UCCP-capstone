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
      <div className="flex flex-col">
        <Header />
        <div className="flex p-4 w-full ">
          <SideBar />
          <main className="flex-1 px-2">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
