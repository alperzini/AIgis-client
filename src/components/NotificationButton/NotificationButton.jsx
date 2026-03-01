import { useState, useRef, useEffect } from "react";
import "./NotificationButton.scss";
import bellDot from "../../assets/icons/bell-dot.svg";

function NotificationButton({ items = [] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="notify" ref={wrapRef}>
      <button
        type="button"
        className="notify__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <img className="notify__icon" src={bellDot} alt="" />
      </button>

      {open ? (
        <div className="notify__menu" role="menu">
          <div className="notify__menu-title">Notifications</div>

          {items.length ? (
            <ul className="notify__list">
              {items.map((n) => (
                <li key={n.id} className="notify__item">
                  <div className="notify__item-title">{n.title}</div>
                  {n.meta ? <div className="notify__item-meta">{n.meta}</div> : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="notify__empty">No new notifications</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NotificationButton;