const style = (classes: {[key: string]: boolean}): string => {
  const enabledClasses: string[] = [];

  for (let k in classes) {
    if (classes[k]) {
      enabledClasses.push(k);
    }
  }

  return enabledClasses.join(' ');
};

export default style;
