export function FromSecond(seconds: number): string {
  if (seconds % 3600 === 0) return `${seconds / 3600}h`;
  if (seconds % 60 === 0) return `${seconds / 60}m`;
  return `${seconds}s`;
}

export function ToSecond(no: string): number {
  const num = Number(no);
  if (isNaN(num)) return 0;
  return num * 60;
}