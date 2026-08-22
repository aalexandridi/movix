"use client";

import {
  ArrowLeft,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VideoPlayer({ id }: { id: string }) {
  const router = useRouter();

  const [controlsVisible, setControlsVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <main
      className="group fixed inset-0 overflow-hidden bg-black "
      onMouseMove={() => setControlsVisible(true)}
    >
      {/* Video */}
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title="Video player"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />

      {/* Top gradient */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Top controls */}
      <div
        className={`absolute inset-y-0 z-20 flex items-center p-5 transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => router.back()}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full
            bg-black/50
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/20
          "
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Bottom gradient */}
      {/* <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      /> */}

      {/* Bottom controls */}
      {/* <div
        className={`absolute inset-x-0 bottom-0 z-20 p-5 transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >

        <div className="mb-4 h-1 w-full rounded-full bg-white/30">
          <div className="h-full w-[35%] rounded-full bg-white" />
        </div>

        <div className="flex items-center gap-4 text-white">
          <button
            className="transition hover:scale-110"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={22} /> : <Play size={22} />}
          </button>

          <button
            className="transition hover:scale-110"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>

          <span className="text-sm text-white/80">00:00 / 02:15:32</span>

          <div className="flex-1" />

          <button
            className="transition hover:scale-110"
            aria-label="Fullscreen"
          >
            <Maximize size={22} />
          </button>
        </div>
      </div> */}
    </main>
  );
}
