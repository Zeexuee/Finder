export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">✅ Tailwind is Working!</h1>
        <p className="text-gray-600 text-lg">If you see this with proper styling, Tailwind CSS is configured correctly.</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Click Me
        </button>
      </div>
    </div>
  );
}
