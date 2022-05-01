exports.dateFormater = (date) => {
  console.log(date.split("").slice(0, 10).join(""));
  let myDate = new Date(date.split("").slice(0, 10).join(""));
  return date.split("").slice(0, 10).join("");
  //   return (
  //     myDate.getFullYear() +
  //     "-" +
  //     myDate.getMonth() +
  //     "-" +
  //     (myDate.getDate() + 1)
  //   );
};
