export default function ComplaintsPage() {
  return (
    <div className="p-8 space-y-4 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900">Complaint Tracking</h1>
      <p className="text-gray-700">
        Log, assign, and resolve resident complaints transparently with
        real-time status updates.
      </p>
      <a href="/dashboard" className="text-blue-600 underline hover:text-blue-800">
        ← Back to Dashboard
      </a>
    </div>
  );
}
