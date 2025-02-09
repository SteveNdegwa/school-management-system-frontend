import ApiManager from "../ApiManager/ApiManager";

interface props {
    target: string,
    additionalFilters: object,
    onSearch: (results: any) => void,
};

export default function Searchbar({target, additionalFilters, onSearch}: props) {
    const search = async(searchWord: string) => {
        try {
            let results: any = {data: []}
            if (target == "users" ){
                results = await ApiManager.filterUsers({...additionalFilters, search_word: searchWord})
            }
            onSearch(results.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="form-control flex flex-row items-center justify-center w-full mb-8">
            <input type="text" onChange={(e) => search(e.target.value)} placeholder="Search" className="input input-bordered w-56  md:w-auto"/>
      </div>
    );
};