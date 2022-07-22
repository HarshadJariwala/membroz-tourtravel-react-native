import Axios from '../../helpers/appConfig';

export const getPackageService = (itemid) => {
    let body
    if (itemid != null) {
        body = {
            "search":
                [{
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                },
                {
                    "searchfield": "packagetype",
                    "searchvalue": itemid,
                    "criteria": "eq",
                    "datatype": "objectid"
                }
                ], "formname": "tourpackage", "size": "5"
        }
    } else {
        const body = {
            "search":
                [{
                    "searchfield": "status",
                    "searchvalue": "active",
                    "criteria": "eq",
                    "datatype": "text"
                }
                ], "formname": "tourpackage",

        }
    }
    return Axios.post('tourpackages/filter', body);
}


export const topTourPackagesListService = () => {
    const body = {
        "search":
            [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            }
            ], "formname": "tourpackage",
        "size": "5"
    }
    return Axios.post('tourpackages/filter', body);
}