import Axios from '../../helpers/appConfig';

export const InventoryListService = (itemid) => {
    let body
    if (itemid != null) {
        body =
        {
            "search":
                [
                    { "searchfield": "category", "searchvalue": itemid, "criteria": "eq", "datatype": "ObjectId" },
                    // { "searchfield": "branchid", "searchvalue": branchid, "criteria": "eq", "datatype": "ObjectId" },
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq", }
                ]
        }
    }
    else {
        body =
        {
            "search":
                [
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }
                    // { "searchfield": "branchid", "searchvalue": branchid, "criteria": "eq", "datatype": "ObjectId" }
                ]
        }
    }

    return Axios.post('billitems/filter', body);
}

export const SuggestionListService = (itemid) => {
    let body
    if (itemid != null) {
        body =
        {
            "search":
                [
                    { "searchfield": "category", "searchvalue": itemid, "criteria": "eq", "datatype": "ObjectId" },
                    { "searchfield": "status", "searchvalue": "active", "criteria": "eq", }
                ], "size": 2
        }
    }

    return Axios.post('billitems/filter', body);
}