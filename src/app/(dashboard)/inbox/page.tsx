

export default function InboxPage() {
  async function connectGmail() {
    window.location.href =
      "/api/gmail/connect";
  }

  return (
    <div>
      <h1>Inbox</h1>

      <button onClick={connectGmail}>
        Connect Gmail
      </button>
    </div>
  );
}