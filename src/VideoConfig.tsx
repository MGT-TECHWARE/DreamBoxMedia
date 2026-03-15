import { createContext, useContext, type ReactNode } from 'react';

export type VideoUrls = {
  droneLoop: string;
  commercials: string;
  videography: string;
  strategicVideoMarketing: string;
  documentary: string;
  brandVideo: string;
  hypeRecap: string;
  corporateEvents: string;
  cinematography: string;
};

const videoUrls: VideoUrls = {
  droneLoop: '/drone-loop.mp4',
  commercials: '/commercials-high-end-bg.mp4',
  videography: '/videography-bg.mp4',
  strategicVideoMarketing: '/strategic-video-marketing-bg.mp4',
  documentary: '/documentary-bg.mp4',
  brandVideo: '/brand-video-bg.mp4',
  hypeRecap: '/hype-recap-bg.mp4',
  corporateEvents: '/corporate-events-bg.mp4',
  cinematography: '/cinematography-bg.mp4',
};

const VideoConfigContext = createContext<VideoUrls>(videoUrls);

export function VideoConfigProvider({ children }: { children: ReactNode }) {
  return (
    <VideoConfigContext.Provider value={videoUrls}>
      {children}
    </VideoConfigContext.Provider>
  );
}

export function useVideoConfig(): VideoUrls {
  return useContext(VideoConfigContext);
}
