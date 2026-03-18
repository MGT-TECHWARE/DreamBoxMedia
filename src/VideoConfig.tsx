import { createContext, useContext, type ReactNode } from 'react';

export type VideoKey = 'droneLoop' | 'commercials' | 'videography' | 'strategicVideoMarketing' | 'documentary' | 'brandVideo' | 'hypeRecap' | 'corporateEvents' | 'cinematography';

export type VideoUrls = Record<VideoKey, string>;

export type VideoConfig = {
  urls: VideoUrls;
  posters: Record<VideoKey, string>;
};

const videoConfig: VideoConfig = {
  urls: {
    droneLoop: '/drone-loop.mp4',
    commercials: '/commercials-high-end-bg.mp4',
    videography: '/videography-bg.mp4',
    strategicVideoMarketing: '/strategic-video-marketing-bg.mp4',
    documentary: '/documentary-bg.mp4',
    brandVideo: '/brand-video-bg.mp4',
    hypeRecap: '/hype-recap-bg.mp4',
    corporateEvents: '/corporate-events-bg.mp4',
    cinematography: '/cinematography-bg.mp4',
  },
  posters: {
    droneLoop: '/drone-loop-poster.jpg',
    commercials: '/commercials-high-end-bg-poster.jpg',
    videography: '/videography-bg-poster.jpg',
    strategicVideoMarketing: '/strategic-video-marketing-bg-poster.jpg',
    documentary: '/documentary-bg-poster.jpg',
    brandVideo: '/brand-video-bg-poster.jpg',
    hypeRecap: '/hype-recap-bg-poster.jpg',
    corporateEvents: '/corporate-events-bg-poster.jpg',
    cinematography: '/cinematography-bg-poster.jpg',
  },
};

const VideoConfigContext = createContext<VideoConfig>(videoConfig);

export function VideoConfigProvider({ children }: { children: ReactNode }) {
  return (
    <VideoConfigContext.Provider value={videoConfig}>
      {children}
    </VideoConfigContext.Provider>
  );
}

export function useVideoConfig(): VideoConfig {
  return useContext(VideoConfigContext);
}
