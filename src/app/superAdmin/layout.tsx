import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex p-4 w-full ">
        <Sidebar />
        <main className="flex-1 px-2">{children}</main>
      </div>
    </div>
  );
}
