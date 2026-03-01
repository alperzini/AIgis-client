import { useEffect, useMemo, useRef, useState } from "react";
import "./NotesThread.scss";
import Button from "../Button/Button";

function NotesThread() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef(null);

  const seed = useMemo(
    () => [
      {
        id: "seed-1",
        type: "system",
        message: "Case opened for analyst review.",
        ts: "12-02-2025 12:00 am",
        isNew: false,
      },
      {
        id: "seed-2",
        type: "user",
        message: "Flagged for unusual purchase location.",
        ts: "12-02-2025 12:01 am",
        isNew: false,
      },
    ],
    []
  );

  const [notes, setNotes] = useState(seed);

  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTop = 0;
  }, [notes.length, isTyping]);

  const clearNewFlag = (id) => {
    setTimeout(() => {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
      );
    }, 650);
  };

  const addNote = ({ type, message }) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const item = {
      id,
      type,
      message,
      ts: new Date().toLocaleString(),
      isNew: true,
    };
    setNotes((prev) => [item, ...prev]);
    clearNewFlag(id);
  };

  const handleAdd = () => {
    const v = text.trim();
    if (!v) return;

    addNote({ type: "user", message: v });
    setText("");
    setIsTyping(true);

    setTimeout(() => {
      addNote({ type: "system", message: "System: Note added to case timeline." });
    }, 650);

    setTimeout(() => {
      addNote({
        type: "ai",
        message:
          "AI Assist: Location anomaly detected. Consider reviewing device fingerprint and IP consistency.",
      });
    }, 1450);

    setTimeout(() => setIsTyping(false), 2150);
  };

  return (
    <aside className="notes" aria-label="Notes and comments thread">
      <div className="notes__header">NOTES / COMMENTS THREAD</div>

      <div
        className="notes__thread"
        role="region"
        aria-label="Thread"
        ref={threadRef}
      >
        <ul className="notes__list">
          {isTyping ? (
            <li className="notes__item notes__item--typing">
              <div className="notes__bubble">
                <div className="notes__typing" aria-live="polite">
                  <span className="notes__dot" />
                  <span className="notes__dot" />
                  <span className="notes__dot" />
                </div>
                <div className="notes__meta">AI Assist is typing…</div>
              </div>
            </li>
          ) : null}

          {notes.map((n) => (
            <li
              key={n.id}
              className={[
                "notes__item",
                `notes__item--${n.type}`,
                n.isNew ? "notes__item--new" : "",
              ].join(" ")}
            >
              <div className="notes__bubble">
                <div className="notes__msg">{n.message}</div>
                <div className="notes__meta">{n.ts}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notes__composer">
        <label className="notes__label" htmlFor="noteInput">
          write note
        </label>

        <textarea
          id="noteInput"
          className="notes__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="write note"
          rows={3}
        />

        <Button
          type="button"
          variant="primary"
          onClick={handleAdd}
          disabled={!text.trim()}
          className="notes__btn"
        >
          Add note
        </Button>
      </div>
    </aside>
  );
}

export default NotesThread;