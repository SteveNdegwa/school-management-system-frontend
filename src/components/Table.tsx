export interface row {
    name: string,
    data: string[],
    link: string
}

interface props{
    columns: string[],
    rows: row[],
}

export function Table({columns, rows}: props){
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((column)=>{
                                return (
                                    <th scope="col" className="px-6 py-3">
                                        {column}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row)=>{
                                return (
                                    <tr key={row.name} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {row.name}
                                        </th>
                                        {row.data.map((data)=>{
                                            return (
                                                <td className="px-6 py-4">
                                                    {data}
                                                </td>
                                            )
                                        })}
                                        <td className="px-6 py-4">
                                            <a href={row.link} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                        </td>
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </div>
    )
}