import Axios from '../../helpers/appConfig';

export const CategoryListService = () => {
    const body =
    {
        "search":
            [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "formid",
                "searchvalue": "62592845a8da38064c04bb6b",
                "criteria": "eq",
                "datatype": "objectid"
            }
            ], "formname": "packagetype",

    }
    return Axios.post('formdatas/filter', body);
}

export const topTourCategoryListService = () => {
    const body =
    {
        "search":
            [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            },
            {
                "searchfield": "formid",
                "searchvalue": "62592845a8da38064c04bb6b",
                "criteria": "eq",
                "datatype": "objectid"
            }
            ], "formname": "packagetype",
        "size": "5"
    }

    return Axios.post('formdatas/filter', body);
}