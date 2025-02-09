export interface row {
    count: number,
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
        <div className="h-full overflow-scroll flex-1 table-zebra table-pin-rows ">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column)=>{
                            return (
                                <th >{column}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row)=>{
                        return (
                            <tr key={row.name} className="hover">
                                <th>{row.count}</th>
                                <th>{row.name}</th>
                                {row.data.map((data)=>{
                                    return (
                                        <td className="px-6 py-4">{data}</td>
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
    );
};