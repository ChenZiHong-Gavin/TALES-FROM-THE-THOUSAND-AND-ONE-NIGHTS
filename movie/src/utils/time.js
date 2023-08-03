const parseTimeString = (timeString) => {
  const [time, ms] = timeString.split(',');
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000 + Number(ms);
};

export {parseTimeString};