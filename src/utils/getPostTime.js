export const timeAgo = timestamp => {
  const d = new Date();
  const nowInSeconds = Math.floor(d.getTime() / 1000);
  const seconds = nowInSeconds - timestamp;

  if (seconds > 2 * 24 * 3600) {
    return 'a few days ago';
  }
  if (seconds > 24 * 3600) {
    return 'yesterday';
  }
  if (seconds > 12 * 3600) {
    return '12h ago';
  }
  if (seconds > 11 * 3600) {
    return '11h ago';
  }
  if (seconds > 10 * 3600) {
    return '10h ago';
  }
  if (seconds > 9 * 3600) {
    return '9h ago';
  }
  if (seconds > 8 * 3600) {
    return '8h ago';
  }
  if (seconds > 7 * 3600) {
    return '7h ago';
  }
  if (seconds > 6 * 3600) {
    return '6h ago';
  }
  if (seconds > 5 * 3600) {
    return '5h ago';
  }
  if (seconds > 4 * 3600) {
    return '4h ago';
  }
  if (seconds > 3 * 3600) {
    return '3h ago';
  }
  if (seconds > 2 * 3600) {
    return '2h ago';
  }
  if (seconds > 3600) {
    return '1h ago';
  }
  if (seconds > 60) {
    return Math.floor(seconds / 60) + 'm ago';
  }
  if (seconds <= 60) {
    return 'just now';
  }
};
