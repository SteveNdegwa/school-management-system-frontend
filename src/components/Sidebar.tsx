export default function Sidebar(){
    return (
      <>
        <ul className="menu bg-base-100 max-w-56 h-full flex-1">
            <li><a>Homepage</a></li>
            <li>
                <details open>
                    <summary>Users</summary>
                    <ul>
                        <li><a>Students</a></li>
                        <li><a>Teachers</a></li>
                        <li><a>Clerks</a></li>
                        <li><a>Admins</a></li>
                        <li>
                            {/* <details open>
                                <summary>Parent</summary>
                                <ul>
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details> */}
                        </li>
                    </ul>
                </details>
            </li>
            <li><a>Books</a></li>
        </ul>
      </>
    );
};