export const validateData = (itemType, options) => {
  var count = 0;
  options.forEach((element) => {
    if (
      element.trim().split(" ").join("").toLowerCase() ===
      itemType.trim().split(" ").join("").toLowerCase()
    ) {
      count++;
    }
  });
  if (count > 0) return false;
  else return true;
};
