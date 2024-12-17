const frames = import.meta.glob('./chrisFrame*.png', { eager: true });
export const christmasFrames = Object.values(frames).map(frame => (frame as any).default);

