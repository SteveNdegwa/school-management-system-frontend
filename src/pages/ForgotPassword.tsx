import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Toaster, toast } from 'sonner';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import Error from '../components/Error';
import FormLink from '../components/FormLink';
import ApiManager from '../ApiManager/ApiManager';
import { store } from '../store';


interface FormData {
    username: string,
};

export function ForgotPassword(){
    console.log("store state", store.getState());
    const schema = yup.object().shape({
        username: yup.string().required('Please enter your username'),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = async (data: FormData) => {
        const loadingToast = toast.loading('Loading...');
        try {
            await ApiManager.forgotPassword(data);
            toast.dismiss(loadingToast);
            toast.success('Password reset successfully. New password sent to your email address', {duration: 10000});
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error);
        }
    };

    return (
        <Form formHeader='Enter your username'>
            <Toaster position='top-center' richColors/>
            <Input inputType='text' inputId='username' yupRegister={register('username')}/>
            {errors?.username && <Error message={errors.username?.message}/>}
            <Button onClick={handleSubmit(onFormSubmit)} name='Submit'/>
            <FormLink text='Back to login' link='/login'/>
        </Form>
    )
}