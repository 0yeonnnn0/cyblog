export const getVisitorCount = async () => {
  const response = await fetch("/api/visitorcounter");
  return response.json();
};

export const incrementVisitorCount = async () => {
  const response = await fetch("/api/visitorcounter", { method: "POST" });
  return response.json();
};
