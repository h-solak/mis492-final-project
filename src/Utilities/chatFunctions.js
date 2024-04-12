function isDateMoreRecent(date1, date2) {
  // Convert both dates to milliseconds since Unix epoch
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  // If date1 is greater than date2, return true; otherwise, return false
  return time1 > time2;
}

function findLatestMessage(messages, dateParameter) {
  for (let i = messages?.length - 1; i >= 0; i--) {
    const messageDate = new Date(messages[i].createdAt);

    if (messageDate > dateParameter) {
      return messages[i];
    }
  }

  return null;
}

export { isDateMoreRecent, findLatestMessage };
