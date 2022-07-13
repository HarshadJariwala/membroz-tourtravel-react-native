import Axios from '../../helpers/appConfig';

export const CategoryListService = () => {
    const body = {
        "search":
            [{
                "searchfield": "formid",
                "searchvalue": "5e058897b0c5fb2b6c15cc69",
                "criteria": "eq",
                "datatype": "ObjectId"
            }], "formname": "poscategory"
    }
    return Axios.post('formdatas/filter', body);
}