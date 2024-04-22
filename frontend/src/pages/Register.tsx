import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types/User.ts';
import { FaUser } from 'react-icons/fa';
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice.ts';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState<User>({ name: '', email: '', password: '', password2: '' });
    const {name, email, password, password2} = formData;   

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isSuccess, isError, message} = useSelector((state: any) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        //Redirect when logged in
        if(isSuccess || user){
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if(password !== password2){
            toast.error("The passwords do not match");
        }else{
            const userData: User = {
                name,
                email,
                password
            }
            dispatch(register(userData) as any);
        }
    }

    return (
        <>
            <section className='heading'>
                <h1><FaUser /> Register</h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='name'
                            name='name'
                            value={name} 
                            onChange={onChange} 
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='email' 
                            className='form-control' 
                            id='email'
                            name='email'
                            value={email} 
                            onChange={onChange} 
                            placeholder='Enter your email'
                            required
                        />
                        <input 
                            type='password' 
                            className='form-control' 
                            id='password'
                            name='password'
                            value={password} 
                            onChange={onChange} 
                            placeholder='Enter your password'
                            required
                        /> 
                        <input 
                            type='password' 
                            className='form-control' 
                            id='password2'
                            name='password2'
                            value={password2} 
                            onChange={onChange} 
                            placeholder='Confirm your password'
                            required
                        />                                                
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block'>Submit</button>
                    </div>                   
                </form>
            </section>
        </>
    );
}

export default Register