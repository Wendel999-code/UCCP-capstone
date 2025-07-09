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
      <div className="flex flex-col ">
        <Nav />
        <div className="flex p-4 w-full">
          <Sidebar />
          <main className="flex-1 px-2">{children}</main>
        </div>
      </div>
    </MemberLayoutGuard>
  );
}
