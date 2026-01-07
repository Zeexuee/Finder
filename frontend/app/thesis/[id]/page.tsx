import ThesisDetailComponent from "@/components/thesis/ThesisDetail";

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Thesis Detail - Thesis Finder",
  description: "View detailed information about a thesis",
};

export default function ThesisDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <ThesisDetailComponent id={params.id} />
      </div>
    </div>
  );
}
