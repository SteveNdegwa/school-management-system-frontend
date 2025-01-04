interface props{
    inputType: string,
    inputId: string,
    yupRegister: any,
};

export default function Input({inputType, inputId, yupRegister}: props){
    return (
        <input type={inputType} id={inputId} {...yupRegister} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={inputId}></input>
    )
};