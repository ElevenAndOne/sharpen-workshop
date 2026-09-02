import { useState } from 'react';

interface Props {
  /**
   * YouTube id. Pass null when no verified SHARPEN footage exists yet — the
   * component then renders an empty slot instead of an embed, so the page
   * never shows unrelated footage as if it were the event.
   */
  youtubeId: string | null;
  title: string;
  /** Where to send people in the meantime. */
  fallbackHref: string;
  fallbackLabel: string;
  /** Art direction for the pending state. */
  brief: string;
  /** Optional still shown behind the pending state so the slot reads as a
      video poster rather than an empty box. */
  poster?: string;
}

/**
 * Click-to-load YouTube facade. Nothing from youtube.com is requested until
 * the visitor actually asks for the video, which keeps the page fast and
 * avoids third-party cookies on first load.
 */
export default function VideoEmbed({
  youtubeId,
  title,
  fallbackHref,
  fallbackLabel,
  brief,
  poster,
}: Props) {
  const [playing, setPlaying] = useState(false);

  /* ---------- no verified asset yet ---------- */
  if (!youtubeId) {
    return (
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${fallbackLabel} (opens in a new tab)`}
        title={brief}
        className="group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden bg-gray-900"
      >
        {poster && (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-90"
          />
        )}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/55 to-gray-950/10"
          aria-hidden="true"
        />
        <span className="relative flex size-20 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-brand group-hover:border-brand">
          <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </a>
    );
  }

  /* ---------- verified asset ---------- */
  if (playing) {
    return (
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-gray-900">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden bg-gray-900"
    >
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full scale-[1.02] object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:scale-100 group-hover:opacity-80"
      />
      <span className="relative flex size-16 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </button>
  );
}
