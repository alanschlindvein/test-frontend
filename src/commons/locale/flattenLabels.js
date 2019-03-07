const flattenMessages = (nestedMessages, prefix = '') => {
  let value = '',
    prefixedKey = '';

  return Object.keys(nestedMessages).reduce((messages, key) => {
    value = nestedMessages[key];
    prefixedKey = prefix ? `${prefix}.${key}` : key;

    typeof value === 'string'
      ? (messages[prefixedKey] = value)
      : Object.assign(messages, flattenMessages(value, prefixedKey));

    return messages;
  }, {});
};

export default flattenMessages;
