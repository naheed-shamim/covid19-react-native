const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
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
};

export const calculateRemainingTimeFor = (date) => {
  let now = new Date().getTime();
  let t = date - now;
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((t % (1000 * 60)) / 1000);
  return { days, hours, min, sec };
};

export const toCommas = (value: string | number): string => {
  var n1, n2;
  value = value + "" || "";
  // works for integer and floating as well
  n1 = value.split(".");
  n2 = n1[1] || null;
  n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  value = n2 ? n1 + "." + n2 : n1;
  return value;
};

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const getRandomColor = () => {
  var letters = "456789";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
};

// export const formatDate = (unformattedDate) => {
//   const day = unformattedDate.slice(0, 2);
//   const month = unformattedDate.slice(3, 5);
//   const year = unformattedDate.slice(6, 10);
//   const time = unformattedDate.slice(11);
//   return `${year}-${month}-${day}T${time}+05:30`;
// };

/**
 *
 * @param {*} array | Pass the Array to sort
 * @param {*} comparatorField | Pass the property of the object to be compared
 * @param {*} isAscending | Ascending sort, by default
 */
export const sortArrayBy = (array: any[], comparatorField: string, isAscending: any = true) => {
  let sortedArray = [];

  if (array && array.length > 0) {
    const element = array[0][comparatorField];

    const isNumericString = !isNaN(element);

    if (Number.isInteger(element)) {
      sortedArray = sortNumberArray(array, comparatorField, isAscending);
    } else if (isNumericString) {
      sortedArray = sortNumericStringArray(array, comparatorField, isAscending);
    } else {
      sortedArray = sortStringArray(array, comparatorField, isAscending);
    }
  }
  return sortedArray;
};

const sortNumberArray = (array: any[], comparatorField: string, isAscending: any = true) => {
  let sortedArray = [];
  try {
    sortedArray = isAscending
      ? array.sort((item1, item2) => (item1[comparatorField] > item2[comparatorField] ? 1 : -1))
      : array.sort((item1, item2) => (item1[comparatorField] > item2[comparatorField] ? -1 : 1));
  } catch (error) {
    if (error instanceof TypeError) {
      //TODO:Handle
    }
  }
  return sortedArray;
};

const sortNumericStringArray = (array: any[], comparatorField: string, isAscending: any = true) => {
  let sortedArray = [];
  try {
    sortedArray = isAscending
      ? array.sort((item1, item2) =>
          parseInt(item1[comparatorField]) > parseInt(item2[comparatorField]) ? 1 : -1
        )
      : array.sort((item1, item2) =>
          parseInt(item1[comparatorField]) > parseInt(item2[comparatorField]) ? -1 : 1
        );
  } catch (error) {
    if (error instanceof TypeError) {
      //TODO:Handle
    }
  }
  return sortedArray;
};

const sortStringArray = (array: any[], comparatorField: string, isAscending: any = true) => {
  let sortedArray = [];
  try {
    sortedArray = isAscending
      ? array.sort((item1, item2) =>
          item1[comparatorField].toString().toLowerCase() >
          item2[comparatorField].toString().toLowerCase()
            ? 1
            : -1
        )
      : array.sort((item1, item2) =>
          item1[comparatorField].toString().toLowerCase() >
          item2[comparatorField].toString().toLowerCase()
            ? -1
            : 1
        );
  } catch (error) {
    if (error instanceof TypeError) {
      //TODO:Handle
    }
  }
  return sortedArray;
};

export const Colors = {
  aqua: "#00ffff",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  black: "#000000",
  blue: "#0000ff",
  brown: "#a52a2a",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  khaki: "#f0e68c",
  lightblue: "#add8e6",
  lightcyan: "#e0ffff",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  pink: "#ffc0cb",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  white: "#ffffff",
  yellow: "#ffff00",
};
