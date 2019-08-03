
export function handleActionsExt(actions) {
  const handlers = Object
    .keys(actions)
    .reduce((result, key) => {
      if (actions[key].type !== key) {
        // eslint-disable-next-line no-console
        console.error(`Constant ${key} should match type ${actions[key].type}. reducer won't be called.`);
      }
      result[key] = actions[key].reducer;
      return result;
    }, {});

  return handlers;
}
