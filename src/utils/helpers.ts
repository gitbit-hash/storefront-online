export const bodyKeysMessageBuilder = (
  option: 'Required' | 'Optional' | 'NotAllowed',
  stringArr?: string[]
) => {
  if (option === 'NotAllowed') {
    return `Not required or not optional property key(s), remove the extra key(s).`;
  }
  if (stringArr) {
    if (stringArr.length === 1) {
      if (option === 'Required') {
        return `Missing or invalid required property key, body required property key should be (${stringArr[0]}).`;
      } else if (option === 'Optional') {
        return `Invalid optional property key. body optional property key should be (${stringArr[0]}).`;
      }
    } else {
      const stringFromArr = stringArr.join(', ');

      if (option === 'Required') {
        return `Missing or invalid required keys, body required property keys should be (${stringFromArr}).`;
      } else if (option === 'Optional') {
        return `Invalid optional property key, body optional property key should be (${stringFromArr}).`;
      }
    }
  }
};
