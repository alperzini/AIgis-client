import { useEffect, useMemo, useRef, useState } from "react";
import "./NotesThread.scss";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

function NotesThread() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef(null);

  const seed = useMemo(
    () => [
      {
        id: "seed-1",
        type: "system",
        message: "Case created and queued for analyst review.",
        ts: "12-02-2025 12:00 am",
        isNew: false,
      },
      {
        id: "seed-2",
        type: "user",
        message: "Flagged: unusual purchase location detected.",
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
      addNote({
        type: "system",
        message: "System update: Note saved to the case timeline.",
      });
    }, 650);

    setTimeout(() => {
      addNote({
        type: "ai",
        message:
          "AI Assist: Location mismatch detected. Recommended next checks: device fingerprint, IP history, and recent merchant pattern.",
      });
    }, 1450);

    setTimeout(() => setIsTyping(false), 2150);
  };

  return (
    <aside className="notes" aria-labelledby="notes-title">
      <Typography
        id="notes-title"
        variant="h3"
        as="h2"
        className="notes__header"
      >
        Case Timeline
      </Typography>

      <div
        className="notes__thread"
        role="log"
        aria-label="Notes feed"
        aria-live="polite"
        aria-relevant="additions text"
        ref={threadRef}
      >
        <ul className="notes__list">
          {isTyping ? (
            <li className="notes__item notes__item--typing">
              <div className="notes__bubble">
                <div className="notes__typing" aria-hidden="true">
                  <span className="notes__dot" />
                  <span className="notes__dot" />
                  <span className="notes__dot" />
                </div>

                <Typography variant="p3" as="div" className="notes__meta">
                  AI Assist is typing…
                </Typography>
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
                <Typography variant="p1" as="div" className="notes__msg">
                  {n.message}
                </Typography>

                <Typography variant="p3" as="div" className="notes__meta">
                  {n.ts}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notes__composer" aria-label="Write a note">
        <Typography
          variant="p2"
          as="label"
          className="notes__label"
          htmlFor="noteInput"
        >
          Record Note
        </Typography>

        <textarea
          id="noteInput"
          className="notes__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note for the case timeline…"
          rows={3}
        />

        <Button
          type="button"
          variant="primary"
          onClick={handleAdd}
          disabled={!text.trim()}
          className="notes__btn"
        >
          Submit
        </Button>
      </div>
    </aside>
  );
}

export default NotesThread;