import { Loader2 } from "lucide-react";
import { lazy, Suspense, useState } from "react";
const EmojiPicker = lazy(() => import("emoji-picker-react"));
export default function Emojis(props) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={props.className}>
      <button
        type="button"
        className="mt-4"
        onClick={() => setShowPicker(!showPicker)}
      >
        😊
      </button>
      {showPicker && (
        <Suspense fallback={<Loader2 />}>
          <div className="absolute top-10 left-0">
            <EmojiPicker
              onEmojiClick={props.handleEmojiClick}
              lazyLoadEmojis={true}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
