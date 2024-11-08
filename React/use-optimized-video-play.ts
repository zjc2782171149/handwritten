import { useEffect, useRef, useState } from "react";
import useFallback from "./useFallback";

const useOptimizedVideoPlay = (video: HTMLVideoElement | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const requestRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isIntersecting = useRef(false);
  const isVideoFallback = useFallback("video");

  useEffect(() => {
    if (!video) return;

    const playVideo = () => {
      if (video.paused && !video.ended) {
        video.play().catch((err) => {
          console.warn(
            "Play failed, possibly due to user interaction required: ",
            err
          );
        });
      }
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        isIntersecting.current = entry.isIntersecting;
        if (isIntersecting.current) {
          setIsPlaying(true);
          requestRef.current = requestAnimationFrame(playVideo);
        } else {
          setIsPlaying(false);
          video.pause();
        }
      });
    };

    const fallbackCheck = () => {
      const rect = video.getBoundingClientRect();
      const inView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (inView && !isPlaying) {
        setIsPlaying(true);
        playVideo();
      } else if (!inView && isPlaying) {
        setIsPlaying(false);
        video.pause();
      }
    };

    if (isVideoFallback || !("IntersectionObserver" in window)) {
      window.addEventListener("scroll", fallbackCheck);
      window.addEventListener("resize", fallbackCheck);
      fallbackCheck();
    } else {
      observerRef.current = new IntersectionObserver(handleIntersect, {
        threshold: 0.1,
      });
      observerRef.current.observe(video);
    }

    const onPause = () => {
      if (video.currentTime !== video.duration && isPlaying) {
        requestRef.current = requestAnimationFrame(playVideo);
      }
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", () => setIsPlaying(true));
      video.removeEventListener("ended", () => setIsPlaying(false));

      if (observerRef.current) {
        observerRef.current.disconnect();
      } else {
        window.removeEventListener("scroll", fallbackCheck);
        window.removeEventListener("resize", fallbackCheck);
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [video, isPlaying, isVideoFallback]);

  return { isPlaying };
};

export default useOptimizedVideoPlay;
