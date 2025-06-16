export {};

declare global {
  interface Window {
    electronAPI: {
      onWindowOpened: (
        callback: (data: {
          app: string;
          title: string;
          openedAt: string;
        }) => void
      ) => void;
      onWindowClosed: (
        callback: (data: {
          app: string;
          title: string;
          openedAt: string;
          closedAt: string;
        }) => void
      ) => void;
    };
  }
}
