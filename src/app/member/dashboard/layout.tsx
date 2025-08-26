import Nav from "./components/nav";
import Sidebar from "./components/sidebar";
import MemberLayoutGuard from "./MemberLayoutGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemberLayoutGuard>
      <div className="flex flex-col  bg-white dark:bg-gray-900 shadow-2xl  border border-gray-100 dark:border-gray-700  ">
        <Nav />
        <div className="flex p-4 w-full">
          <Sidebar />
          <main className="flex-1  ">{children}</main>
        </div>
      </div>
    </MemberLayoutGuard>
  );
}
