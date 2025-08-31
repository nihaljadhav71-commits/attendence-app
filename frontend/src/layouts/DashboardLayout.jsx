import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default function DashboardLayout({children}) {
  return (
    <div className="min-h-screen grid md:grid-cols-[16rem_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
