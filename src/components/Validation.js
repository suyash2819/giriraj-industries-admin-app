export const validateData = (itemType, options) => {
  for (var i = 0; i < options.length; i++) {
    if (
      options[i].trim().split(" ").join("").toLowerCase() ===
        itemType.trim().split(" ").join("").toLowerCase() ||
      itemType.trim() === ""
    ) {
      return false;
    }
  }

  return true;
};
