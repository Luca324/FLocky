import classes from './MyInput.module.css'

function MyInput({children, ...props}) {
    return ( 
        <input {...props} className={classes.myInput} type={props.type || "text"}/>
     );
}

export default MyInput;