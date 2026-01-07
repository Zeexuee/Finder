import DashboardComponent from "@/components/dashboard/Dashboard";

export const metadata = {
  title: "Dashboard - Thesis Finder",
  description: "Your Thesis Finder dashboard",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <DashboardComponent />
      </div>
    </div>
  );
}
