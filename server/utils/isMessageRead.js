//gets message's date and the last date user has read the chat
const isMessageRead = (messageDate, lastRead) => {
  let date1 = new Date(messageDate).getTime();
  let date2 = new Date(lastRead).getTime();

  if (date1 > date2) {
    return false; //message is not read yet
  }

  return true;
};

module.exports = isMessageRead;
