import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import api from '../config/api';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import Error from '../components/Error';


interface FormData {
    username: string,
};

export function ForgotPassword(){

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup
          .string()
          .required('Please enter your username'),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    function onFormSubmit(data: FormData) {
        const loadingToast = toast.loading('Loading...');
        api
            .post('/users/forgot-password/', data)
            .then((response) => {
                toast.dismiss(loadingToast)
                if (response.data.code == '100.000.000'){
                    toast.success('Password reset successfully. New password sent to your email address', {
                        action: {
                          label: 'Back to login',
                          onClick: () => navigate('/login'),
                        },
                        duration: 10000
                      });
                }else{
                    toast.error(response.data.error);
                }
            })
            .catch(() => {
                toast.dismiss(loadingToast);
                toast.error('An error occurred');
            });
    };
    

    return (
        <Form formHeader='Enter your username'>
            <Toaster position='top-center' richColors/>
            <Input inputType='text' inputId='username' yupRegister={register('username')}/>
            {errors?.username && <Error message={errors.username?.message}/>}
            <Button onClick={handleSubmit(onFormSubmit)} name='Submit'/>
        </Form>
    )
}