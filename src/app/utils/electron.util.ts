export function isElectron(): boolean {
  return (
    typeof (window as any).process === 'object' &&
    !!(window as any).process.versions &&
    !!(window as any).process.versions.electron
  );
}
