interface props {
    name: string,
    link: string,
}
export default function MenuItem({ name, link }: props){
    return (
        <li>
            <a href={link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              {name}
            </a>
        </li>
    );
};

