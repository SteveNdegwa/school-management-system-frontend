interface props{
    inputId: string,
    labelName: string,
};

export default function Label({inputId, labelName}: props){
    return (
        <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
    )
};