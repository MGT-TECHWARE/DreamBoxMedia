import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type VideoUrls = {
  droneLoop: string;
  commercials: string;
  videography: string;
  strategicVideoMarketing: string;
  documentary: string;
};

const defaults: VideoUrls = {
  droneLoop: import.meta.env.VITE_DRONE_LOOP_VIDEO_URL || '/drone-loop.mp4',
  commercials: import.meta.env.VITE_COMMERCIALS_VIDEO_URL || '/commercials-bg.mp4',
  videography: import.meta.env.VITE_VIDEOGRAPHY_VIDEO_URL || '/videography-bg.mov',
  strategicVideoMarketing: import.meta.env.VITE_STRATEGIC_VIDEO_MARKETING_VIDEO_URL || '/strategic-video-marketing-bg.mov',
  documentary: import.meta.env.VITE_DOCUMENTARY_VIDEO_URL || '/documentary-bg.mov',
};

const VideoConfigContext = createContext<VideoUrls>(defaults);

let cached: VideoUrls | null = null;

export function VideoConfigProvider({ children }: { children: ReactNode }) {
  const [urls, setUrls] = useState<VideoUrls>(cached ?? defaults);

  useEffect(() => {
    if (cached) {
      setUrls(cached);
      return;
    }
    fetch('/config.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { videoUrls?: Partial<VideoUrls> } | null) => {
        if (data?.videoUrls) {
          const next: VideoUrls = {
            droneLoop: data.videoUrls.droneLoop || defaults.droneLoop,
            commercials: data.videoUrls.commercials || defaults.commercials,
            videography: data.videoUrls.videography || defaults.videography,
            strategicVideoMarketing: data.videoUrls.strategicVideoMarketing || defaults.strategicVideoMarketing,
            documentary: data.videoUrls.documentary || defaults.documentary,
          };
          cached = next;
          setUrls(next);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <VideoConfigContext.Provider value={urls}>
      {children}
    </VideoConfigContext.Provider>
  );
}

export function useVideoConfig(): VideoUrls {
  return useContext(VideoConfigContext);
}
