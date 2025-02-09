import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { setToken, setUserId } from '../store';
import Button from '../components/Button';
import InputLabel from '../components/InputLabel';
import Form from '../components/Form';
import Error from '../components/Error';
import ApiManager from '../ApiManager/ApiManager';
import FormLink from '../components/FormLink';


interface FormData {
    username: string;
    password: string;
};

export function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required('Please enter your username'),
        password: yup.string().required('Please enter your password'),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = async(data: FormData) => {
        const loadingToast = toast.loading('Loading...');
        try { 
            const response: any = await ApiManager.login(data); 
            toast.dismiss(loadingToast);
            dispatch(setUserId(response.data.user_id));
            dispatch(setToken(response.data.token));  
            return navigate('/verify-otp');
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error);
        }
    };
    
    return (
        <Form formHeader='Sign in'>
            <Toaster position='top-center' richColors/>
            <InputLabel inputType='text' inputId='username' yupRegister={register('username')} labelName='Your username'/>
            <InputLabel inputType='password' inputId='password' yupRegister={register('password')} labelName='Password'/>
            <FormLink text='Forgot password?' link='/forgot-password'/>
            {(errors?.username|| errors?.password) && <Error message={errors.username?.message || errors.password?.message}/>}
            <Button onClick={handleSubmit(onFormSubmit)} name='Sign In'/>
        </Form>
    )
}