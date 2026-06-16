import CalendarPreview from "@/components/dashboard/CalendarPreview";
import AgentPanel from "@/components/dashboard/AgentPanel";

export default function CalendarPage() {
  return (
    <div className="p-8 h-screen">
      <div className="grid grid-cols-5 gap-6 h-full text-white">

        <div className="col-span-3">
          <CalendarPreview />
        </div>

        <div className="col-span-2">
          <AgentPanel />
        </div>

      </div>
    </div>
  );
}