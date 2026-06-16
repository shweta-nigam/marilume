import {
  Mail,
  Send,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

export default function GmailPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-semibold">
          Gmail
        </h1>

        <p className="mt-3 text-text-secondary">
          Manage email accounts, sending permissions and
          automation workflows.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-border bg-surface p-8 lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Connected Account
              </h2>

              <p className="text-text-secondary">
                Primary inbox connection
              </p>
            </div>

            <div className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              Active
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-elevated p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Mail className="text-primary" />
              </div>

              <div>
                <p className="font-medium">
                  connected@gmail.com
                </p>

                <p className="text-sm text-text-secondary">
                  Connected successfully
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <h3 className="mb-5 text-lg font-semibold">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <button className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary py-3 font-medium">
              Compose Email
            </button>

            <button className="w-full rounded-2xl border border-border py-3">
              Send Test Email
            </button>

            <button className="w-full rounded-2xl border border-border py-3">
              Sync Labels
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <ShieldCheck className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Security
          </h3>

          <p className="text-text-secondary">
            OAuth credentials are securely stored and
            encrypted.
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <Send className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Sending Activity
          </h3>

          <p className="text-text-secondary">
            Track email automation and outbound sends.
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-8">
          <RefreshCcw className="mb-4 text-primary" />

          <h3 className="mb-2 text-lg font-semibold">
            Synchronization
          </h3>

          <p className="text-text-secondary">
            Keep Gmail labels and metadata synced.
          </p>
        </div>
      </div>
    </div>
  );
}