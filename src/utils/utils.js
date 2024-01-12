export function convertMinutesToHours(minutes) {
  if (isNaN(minutes) || minutes < 0) {
    return "Not Known";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hrs ${remainingMinutes} mins`;
}

export function truncateString(str, maxLength) {
  if (!str) {
    return;
  }

  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}
