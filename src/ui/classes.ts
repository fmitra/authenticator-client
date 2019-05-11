const classes = (classNames: {[key: string]: boolean}): string => {
  const enabledClasses: string[] = [];

  for (let k in classNames) {
    if (classNames[k]) {
      enabledClasses.push(k);
    }
  }

  return enabledClasses.join(' ');
};

export default classes;
