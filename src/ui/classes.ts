/**
 * Return a CSS class string for JSX elements.
 *
 * Sample Usage:
 *
 * <div class={classes({
 *  'mandatory-class': true,
 *  'optional-class': Boolean(this.props.isActive)
 *  })} >
 *  </div>
 */
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
