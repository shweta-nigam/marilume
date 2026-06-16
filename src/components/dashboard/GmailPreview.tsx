const emails = [
  {
    from: "Stripe",
    subject: "Monthly Report",
  },
  {
    from: "OpenAI",
    subject: "API Usage Alert",
  },
  {
    from: "Vercel",
    subject: "Deployment Successful",
  },
];

export default function GmailPreview() {
  return (
    <div className="bg-surface-elevated border border-border rounded-3xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Gmail
      </h2>

      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.subject}
            className="border border-border rounded-xl p-4"
          >
            <div className="font-medium">
              {email.from}
            </div>

            <div className="text-text-secondary">
              {email.subject}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}