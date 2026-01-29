export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/60">
      <span>OwliaBot 正在思考</span>
      <div className="flex gap-1">
        <span className="animate-bounce [animation-delay:-0.3s]">.</span>
        <span className="animate-bounce [animation-delay:-0.15s]">.</span>
        <span className="animate-bounce">.</span>
      </div>
    </div>
  );
}
