const sortByDate = (array, latestFirst = true) => {
  return array.sort((a, b) =>
    latestFirst
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );
};

module.exports = sortByDate;
