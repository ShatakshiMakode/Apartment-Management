export default function BillingPage() {
  return (
    <div className="p-8 space-y-4 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl font-bold">Maintenance Billing</h1>
      <p>
        Generate and send maintenance bills in seconds. Configure billing
        cycles, late-payment rules, and seamless reminders.
      </p>
      <a href="/dashboard" className="text-blue-600 underline hover:text-blue-800">
        ← Back to Dashboard
      </a>
    </div>
  );
}

