export default function CalendarPreview() {
  const meetings = [
    "10:00 Product Review",
    "12:00 Client Call",
    "15:00 Team Sync",
    "18:00 Investor Update",
  ];

  return (
    <div className="bg-surface-elevated border border-border rounded-3xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Calendar
      </h2>

      <div className="space-y-3">
        {meetings.map((meeting) => (
          <div
            key={meeting}
            className="p-4 rounded-xl border border-border"
          >
            {meeting}
          </div>
        ))}
      </div>
    </div>
  );
}