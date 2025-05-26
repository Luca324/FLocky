import classes from "./MyLink.module.css";

function MyLink({children, ...props}) {
  return <button {...props} className={classes.myLink}>
    {children}
  </button>;
}

export default MyLink;
