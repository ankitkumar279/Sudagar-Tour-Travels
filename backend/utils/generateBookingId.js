const generateBookingId = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BK-${randomNumber}`;
};

module.exports = generateBookingId;