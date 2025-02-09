interface props{
    link: string,
    text: string
};

export default function Button({link, text}: props){
    return (
        <div className='flex items-center justify-between'>
            <a href={link} className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-600'>{text}</a>
        </div>
    )
};