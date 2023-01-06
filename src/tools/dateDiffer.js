function dateDiffer(time, time2) {
  const date1 = new Date(time);
  const date2 = new Date(time2);
  const day = date1.getDay();
  const day2 = date2.getDay();
  const milgToHr = (tim) => tim / 3600000;
  const converToMili = (date) => {
    const hours = date.getHours();
    const min = date.getMinutes();
    const hrToMilg = (tim) => tim * 3600000;
    const minToMilg = (tim) => tim * 60000;
    const totalMili = hrToMilg(hours) + minToMilg(min);
    return totalMili;
  };

  const differ = converToMili(date1) - converToMili(date2);
  const differInHr = milgToHr(differ);

  if (day != day2) {
    const removeZero = (num) => (num < 0 ? num * -1 : num);
    const result = removeZero(differInHr) - 24;
    return removeZero(result);
  }

  return differInHr;
}

module.exports.dateDiffer = dateDiffer;
