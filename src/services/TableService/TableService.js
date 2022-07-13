import Axios from '../../helpers/appConfig'

export const getFacilityListService = () => {
    const body =
    {
        "search": [
            { "searchfield": "status", "searchvalue": "active", "criteria": "eq", "datatype": "text" }],
        "select": [
            {
                "fieldname": "title",
                "value": 1
            },
            {
                "fieldname": "property",
                "value": 1
            },
            {
                "fieldname": "unitdetail",
                "value": 1
            }
        ]
    }
    return Axios.post('assets/tablebooking/view', body);
}


export const getBookFacilityTableService = (body) => {
    return Axios.post('facilitybookings', body);
}

export const getBookFacilityTableListService = (id) => {
    const body =
    {
        "search": [
            { "searchfield": "customerid", "searchvalue": id, "criteria": "eq", "datatype": "ObjectId" }]
    }
    return Axios.post('facilitybookings/filter', body);
}

export const updateBookFacilityTableStatusService = (id, body) => {
    return Axios.patch('facilitybookings/' + id, body);
}


