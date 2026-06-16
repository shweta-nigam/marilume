import {
  CalendarDays,
  Clock,
  Bell,
} from "lucide-react";

export default function CalendarPage() {
  const events = [
    "Product Review",
    "Weekly Team Sync",
    "Client Strategy Call",
    "Planning Session",
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-semibold">
          Calendar
        </h1>

        <p className="mt-3 text-text-secondary">
          Manage events, scheduling and availability.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-border bg-surface p-8 lg:col-span-2">
          <h2 className="mb-6 text-xl font-semibold">
            Upcoming Events
          </h2>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event}
                className="rounded-3xl border border-border bg-surface-elevated p-5"
              >
                <h4 className="font-medium">
                  {event}
                </h4>

                <p className="mt-1 text-sm text-text-secondary">
                  Tomorrow • 2:00 PM
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <CalendarDays className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Calendar Status
          </h3>

          <p className="text-text-secondary">
            Google Calendar is connected and syncing.
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <Clock className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Availability
          </h3>

          <p className="text-text-secondary">
            Configure working hours and booking rules.
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <Bell className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Notifications
          </h3>

          <p className="text-text-secondary">
            Manage reminders and event alerts.
          </p>
        </div>
      </div>
    </div>
  );
}