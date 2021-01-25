import Router from 'next/router';
import React, {useState} from 'react';
import {signin, authenticate} from '../../actions/auth';


const SigninComponent = () => {

    const [values, setValues] = useState({
        email: 'venu@gmail.com',
        password: 'BigData@1234',
        error: '',
        loading: false,
        message: '',
        showForm: true

    });

    const {email,password,error,loading,message,showForm} = values;

    const handleSubmit = (e) => {

        e.preventDefault();

        // console.table({name,email,password,error,loading,message,showForm});
        setValues({...values, loading: true, error: false});
        const user = {email,password};

        console.log("venu");

        signin(user)
        .then(data => {
            console.log(data);
            console.log(data.error);
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                     Router.push(`/`);
                })
               
            }
        })

    }

    const handleChange = name => e => {
          setValues({...values, error: false, [name]: e.target.value});
    }

    const showLoading = () => (loading? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email"></input>
            </div>
            <div className="form-group">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password"></input>
            </div>

            <div>
                <button className="btn btn-primary">Signin</button>
            </div>

            </form>
        );
    }
    return (
        <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
        {showForm && signinForm()}
        </React.Fragment>
        );
};

export default SigninComponent;