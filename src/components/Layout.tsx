import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface props {
    children: React.ReactNode,
};

export default function Layout({children}: props){
    return (
       <div>
         <div className="min-w-screen max-h-screen bg-base-200 overflow-auto">
            <div className="min-h-screen w-full flex flex-col justify-start align-center">
                <Navbar/>
                <div className="h-screen max-h-[calc(100vh-60px)] flex flex-row flex-start align-center">
                    <Sidebar/>
                    <div className="flex flex-1 flex-col w-full p-4 m-5 overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
};