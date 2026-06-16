import GmailPreview from "@/components/dashboard/GmailPreview";
import AgentPanel from "@/components/dashboard/AgentPanel";

export default function GmailPage() {
  return (
    <div className="p-8 h-screen">
      <div className="grid grid-cols-5 gap-6 h-full text-white">

        <div className="col-span-3">
          <GmailPreview />
        </div>

        <div className="col-span-2">
          <AgentPanel />
        </div>

      </div>
    </div>
  );
}