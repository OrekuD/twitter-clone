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
  const time = date.toTimeString();

  return `${time}`;
};
