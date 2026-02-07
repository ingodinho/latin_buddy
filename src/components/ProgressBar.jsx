import "./ProgressBar.css";

export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="progress-bar">
      <p className="progress-bar__label">
        Frage {current + 1} von {total}
      </p>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
