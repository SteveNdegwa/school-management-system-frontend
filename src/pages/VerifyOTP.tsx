import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import api from '../config/api';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import Error from '../components/Error';
import Success from '../components/Success';


interface FormData {
    otp: string,
};

export function VerifyOTP(){
    const navigate = useNavigate();

    const schema = yup.object().shape({
        otp: yup
          .string()
          .required('Please enter your OTP'),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    function onFormSubmit(data: FormData) {
        const loadingToast = toast.loading('Loading...');
        api
            .post('/identities/verify-otp/', data)
            .then((response) => {
                toast.dismiss(loadingToast);
                if (response.data.code == '100.000.000'){
                    navigate('/');
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
        <Form formHeader='Enter OTP'>
            <Toaster position='top-center' richColors/>
            <Input inputType='text' inputId='otp' yupRegister={register('otp')}/>
            {!errors?.otp && <Success message='OTP was sent to your email address'/>}
            {errors?.otp && <Error message={errors.otp?.message}/>}
            <Button onClick={handleSubmit(onFormSubmit)} name='Submit'/>
        </Form>
    )
}