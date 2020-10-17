// function abbreviateNumber(value) {
//   var newValue = value;
//   if (value >= 1000) {
//     var suffixes = ["", "k", "m", "b", "t"];
//     var suffixNum = Math.floor(("" + value).length / 3);
//     var shortValue = "";
//     for (var precision = 2; precision >= 1; precision--) {
//       shortValue = parseFloat(
//         (suffixNum != 0
//           ? value / Math.pow(1000, suffixNum)
//           : value
//         ).toPrecision(precision)
//       );
//       var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
//       if (dotLessShortValue.length <= 2) {
//         break;
//       }
//     }
//     if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
//     newValue = shortValue + suffixes[suffixNum];
//   }
//   return newValue;
// }

export const abbreviateNumber = (value: number) => {
  var suffixes = ["", "K", "M", "B", "T"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 !== 0) {
    shortValue = +shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};

// function abbreviateNumber2(value) {
//   var newValue = value;
//   if (value >= 1000) {
//     var suffixes = ["", "k", "m", "b", "t"];
//     var suffixNum = Math.floor(("" + value).length / 3);
//     var shortValue = "";
//     for (var precision = 2; precision >= 1; precision--) {
//       shortValue = parseFloat(
//         (suffixNum != 0
//           ? value / Math.pow(1000, suffixNum)
//           : value
//         ).toPrecision(precision)
//       );
//       var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
//       if (dotLessShortValue.length <= 2) {
//         break;
//       }
//     }
//     if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
//     newValue = shortValue + suffixes[suffixNum];
//   }
//   return newValue;
// }

// const abbreviateNumber = (number: number, fixed: number) => {
//   if (number === null) {
//     return null;
//   } // terminate early
//   if (number === 0) {
//     return "0";
//   } // terminate early
//   fixed = !fixed || fixed < 0 ? 0 : fixed; // numberber of decimal places to show
//   var b = number.toPrecision(2).split("e"), // get power
//     k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
//     c =
//       k < 1
//         ? number.toFixed(0 + fixed)
//         : (number / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
//     d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
//     e = d + ["", "K", "M", "B", "T"][k]; // append power
//   return e;
// }
