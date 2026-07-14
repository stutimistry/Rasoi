import { useState } from "react";
import { askAi } from "../services/mockApi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Ask me anything about substitutions, techniques, or your recipe." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    const answer = await askAi(question);
    setMessages((m) => [...m, { role: "ai", text: answer }]);
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cardamom text-white text-xl shadow-lg hover:bg-cardamom-light transition-colors z-30"
        aria-label="Open AI chat"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 max-h-[28rem] bg-white border border-ink/15 rounded-xl shadow-2xl flex flex-col z-30">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
        <p className="font-display font-semibold text-sm">Ask the chef</p>
        <button onClick={() => setOpen(false)} className="text-steel hover:text-ink text-sm">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`px-3 py-2 rounded-lg max-w-[85%] ${
              m.role === "ai"
                ? "bg-papad-dark text-ink"
                : "bg-cardamom text-white ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="text-xs text-steel px-3">Thinking…</div>}
      </div>
      <form onSubmit={send} className="p-3 border-t border-ink/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Can I replace paneer with tofu?"
          className="flex-1 border border-ink/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-ink text-papad text-sm font-medium hover:bg-cardamom transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
