import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {/* header */}
      <Header />

      <div className="flex px-6 py-6">
        {/* sidebar */}
        <SideBar />

        {/* Main content */}

        <main className="flex-1 px-2 bg-white"> {children}</main>
      </div>
    </div>
  );
}
