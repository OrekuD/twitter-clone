export const joinedAt = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  return `Joined ${month} ${year}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDay();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });

  return `${month} ${day}, ${year}`;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleString("en-GH", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
};

export const timeSince = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "yrs";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mon";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "min";
  }
  return "Now";
};
