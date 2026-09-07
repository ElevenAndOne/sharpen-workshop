import { useState } from 'react';

interface Props {
  /**
   * YouTube id. Pass null when no verified footage exists yet — the component
   * then renders an empty slot instead of an embed, so the page never shows
   * unrelated footage as if it were the event.
   */
  youtubeId: string | null;
  title: string;
  /** Where to send people in the meantime. */
  fallbackHref: string;
  fallbackLabel: string;
  /** Art direction for the pending state. */
  brief: string;
  /**
   * Still shown behind the play button. Preferred over YouTube's own
   * thumbnail: it keeps the facade on-brand and, more importantly, keeps the
   * promise below — i.ytimg.com is a YouTube domain, so hotlinking a
   * thumbnail would call YouTube on page load after all.
   */
  poster?: string;
  /** CSS object-position for the still — a crop this wide needs steering. */
  posterPosition?: string;
  /**
   * CSS aspect-ratio for the slot. Defaults to a standard landscape video;
   * pass '9 / 16' for a phone-shot reel.
   */
  ratio?: string;
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
  posterPosition = '50% 50%',
  ratio = '16 / 9',
}: Props) {
  const [playing, setPlaying] = useState(false);
  const box = { aspectRatio: ratio };

  /* ---------- no verified asset yet ---------- */
  if (!youtubeId) {
    return (
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${fallbackLabel} (opens in a new tab)`}
        title={brief}
        style={box}
        className="group relative flex w-full items-center justify-center overflow-hidden bg-gray-900"
      >
        {poster && (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: posterPosition }}
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
      <div style={box} className="relative w-full overflow-hidden bg-gray-900">
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
      style={box}
      className="group relative flex w-full items-center justify-center overflow-hidden bg-gray-900"
    >
      <img
        src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: posterPosition }}
        /* No hover scale — the page never scales a photograph on hover. */
        className="absolute inset-0 size-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Carries more weight than the pending state's scrim: the button is
          brand red and the poster has a red wall in it. */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/30 to-gray-950/25"
        aria-hidden="true"
      />
      {/* White at rest, brand red on hover — the same move the pending state
          makes. A red disc would sit on the poster's red wall and half
          disappear; white reads over every part of the frame. */}
      <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-ink-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white portrait:size-16">
        <svg viewBox="0 0 24 24" className="ml-1 size-7 portrait:size-6" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </button>
  );
}
