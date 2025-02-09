import Input from "./Input";
import Label from "./Label";

interface props{
    inputId: string,
    inputType: string,
    yupRegister: any,
    labelName: string,
};

export default function InputLabel({inputId, inputType, yupRegister, labelName}: props){
    return (
        <div>
            <Label inputId={inputId} labelName={labelName}/>
            <Input inputType={inputType} inputId={inputId} yupRegister={yupRegister}/>
        </div>
    );
};