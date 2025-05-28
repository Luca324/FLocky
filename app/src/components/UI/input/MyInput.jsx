import classes from './MyInput.module.css'

function MyInput({children, ...props}) {
    return ( 
        <div className={classes.myInputWrapper}>
            <input {...props} className={classes.myInput} type={props.type || "text"}/>
            {children}
        </div>
     );
}

export default MyInput;