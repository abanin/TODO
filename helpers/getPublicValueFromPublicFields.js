module.exports = function getPublicValueFromPublicFields(object = {}, publicFields = []) {
  if(!publicFields || !object) {
    return {};
  }
  const result = publicFields.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});

  if(object._id) {
    result.id = object._id;
  }

  return result;
}
