import Axios from '../../helpers/appConfig';

export const getInternationalListService = () => {
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
                "searchfield": "property.international",
                "searchvalue": "Yes",
                "criteria": "eq",
                "datatype": "text"
            }], "formname": "resortlocation"
    }

    return Axios.post('resortlocations/filter', body)

}

export const getDomesticListService = () => {
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
                "searchfield": "property.international",
                "searchvalue": "No",
                "criteria": "eq",
                "datatype": "text"
            }], "formname": "resortlocation"
    }

    return Axios.post('resortlocations/filter', body)
}

export const topDomesticListService = () => {
    const body =
    {
        "search":
            [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            }
            ], "formname": "resortlocation",
        "size": "6"
    }

    return Axios.post('resortlocations/filter', body)
}