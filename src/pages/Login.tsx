import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { clearToken, clearUserData, clearUserId, setToken, setUserId } from '../store';
import api from '../config/api';
import Button from '../components/Button';
import InputLabel from '../components/InputLabel';
import Form from '../components/Form';
import Error from '../components/Error';


interface FormData {
    username: string;
    password: string;
};

export function Login(){
    const dispatch = useDispatch();

    dispatch(clearUserId());
    dispatch(clearToken());
    dispatch(clearUserData());

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup
          .string()
          .required('Please enter your username'),
        password: yup
          .string()
          .required('Please enter your password'),
      });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    function onFormSubmit(data: FormData) {
        const loadingToast = toast.loading('Loading...');
        api
            .post('/identities/login/', data)
            .then((response) => {
                toast.dismiss(loadingToast)
                if (response.data.code == '100.000.000'){
                    dispatch(setUserId(response.data.data.user_id));
                    dispatch(setToken(response.data.data.token));
                    return navigate('/verify-otp');
                }else{
                    toast.error(response.data.error);
                }
            })
            .catch(() => {
                toast.dismiss(loadingToast);
                toast.error('An error occurred');
            });
    }
    
    return (
        <Form formHeader='Sign in to your account'>
            <Toaster position='top-center' richColors/>
            <InputLabel inputType='text' inputId='username' yupRegister={register('username')} labelName='Your username'/>
            <InputLabel inputType='password' inputId='password' yupRegister={register('password')} labelName='Password'/>
            <div className='flex items-center justify-between'>
                <a href='/forgot-password' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-600'>Forgot password?</a>
            </div>
            {(errors?.username|| errors?.password) && <Error message={errors.username?.message || errors.password?.message}/>}
            <Button onClick={handleSubmit(onFormSubmit)} name='Sign In'/>
        </Form>
    )
}