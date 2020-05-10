import TimeAgo from "react-native-timeago";

const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

export const formatDateAbsolute = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const time = unformattedDate.slice(11);
  return `${day} ${months[month]}, ${time.slice(0, 5)} IST`;
};

export const formatDate = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const year = unformattedDate.slice(6, 10);
  const time = unformattedDate.slice(11);
  return `${year}-${month}-${day}T${time}+05:30`;
};


export const getPercentage = (value: number, total: number): number => {
  return Number(((value / total) * 100).toFixed(2));
  // const confirmedValue = parseInt(TotalConfirmed);
  // const deathsValue = parseFloat(TotalDeaths);
  // const recoveredValue = parseFloat(TotalRecovered);
  // worldDeathPercentage = (deathsValue / confirmedValue) * 100;
  // worldRecoveryPercentage = (recoveredValue / confirmedValue) * 100;
}

export const calculateRemainingTimeFor = date => {
  let now = new Date().getTime();
  let t = date - now;
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((t % (1000 * 60)) / 1000);
  return { days, hours, min, sec };
};

export const toCommas = (value: string): string => {

  let input = value;
  var n1, n2;
  value = value + '' || '';
  // works for integer and floating as well
  n1 = value.split('.');
  n2 = n1[1] || null;
  n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  value = n2 ? n1 + '.' + n2 : n1;
  console.log("Input:", input)
  console.log("Output:", value)
  return value;

}
 

// export const formatDate = (unformattedDate) => {
//   const day = unformattedDate.slice(0, 2);
//   const month = unformattedDate.slice(3, 5);
//   const year = unformattedDate.slice(6, 10);
//   const time = unformattedDate.slice(11);
//   return `${year}-${month}-${day}T${time}+05:30`;
// };