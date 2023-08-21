export const getCustomTimestamp = (
  _format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return now.toLocaleDateString('en-US', options);
};
