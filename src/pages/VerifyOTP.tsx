import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner'
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import Error from '../components/Error';
import Success from '../components/Success';
import ApiManager from '../ApiManager/ApiManager';
import { setUserData } from '../store';

interface FormData {
    otp: string;
};

export function VerifyOTP(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userId = useSelector((state:any) => state.userId);

    const schema = yup.object().shape({
        otp: yup.string().required('Please enter your OTP'),
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = async (data: FormData) => {
        const loadingToast = toast.loading('Loading...');
        try {
            await ApiManager.verifyOTP(data);
            const userProfile: any = await ApiManager.fetchProfile({user_id: userId});
            dispatch(setUserData(userProfile.data));
            toast.dismiss(loadingToast);
            return navigate('/');
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error);
        }
    };

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