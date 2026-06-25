import { useRef, useState, useEffect, useCallback } from 'react';
import './SignaturePad.css';

export default function SignaturePad({ label, storageKey, readOnly = false }) {
  const canvasRef = useRef(null);
  const [sig, setSig] = useState(() => storageKey ? localStorage.getItem(storageKey) : null);
  const [editMode, setEditMode] = useState(!sig);
  const [isEmpty, setIsEmpty] = useState(true);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Initialize canvas resolution on enter edit mode
  useEffect(() => {
    if (!editMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#0D1B3E';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [editMode]);

  const getXY = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const onDown = (e) => {
    e.preventDefault();
    drawing.current = true;
    setIsEmpty(false);
    const pos = getXY(e);
    lastPos.current = pos;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = '#0D1B3E';
    ctx.fill();
  };

  const onMove = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getXY(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const onUp = () => { drawing.current = false; };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.getContext('2d').clearRect(0, 0, rect.width, rect.height);
    setIsEmpty(true);
  };

  const handleSave = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    if (storageKey) localStorage.setItem(storageKey, dataUrl);
    setSig(dataUrl);
    setEditMode(false);
  };

  const handleClear2 = () => {
    if (storageKey) localStorage.removeItem(storageKey);
    setSig(null);
    setIsEmpty(true);
    setEditMode(true);
  };

  /* ── Signed view ── */
  if (!editMode && sig) {
    return (
      <div className="sigpad sigpad--signed">
        <div className="sigpad__signed-img-wrap">
          <img src={sig} alt={label} className="sigpad__signed-img" />
        </div>
        <div className="sigpad__footer">
          <span className="sigpad__label">{label}</span>
          {!readOnly && (
            <button type="button" className="sigpad__retake no-print" onClick={handleClear2}>
              חתום מחדש
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Draw mode ── */
  return (
    <div className="sigpad">
      <div className="sigpad__canvas-wrap no-print">
        <canvas
          ref={canvasRef}
          className="sigpad__canvas"
          style={{ touchAction: 'none' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        />
        {isEmpty && <div className="sigpad__hint">חתמו כאן ←</div>}
      </div>
      <div className="sigpad__actions no-print">
        <button type="button" className="sigpad__btn sigpad__btn--clear" onClick={handleClear} disabled={isEmpty}>
          נקה
        </button>
        <button type="button" className="sigpad__btn sigpad__btn--save" onClick={handleSave} disabled={isEmpty}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          אשר חתימה
        </button>
      </div>
      {/* Empty signature placeholder for print */}
      <div className="sigpad__print-line print-only" />
      <div className="sigpad__label">{label}</div>
    </div>
  );
}
