import Axios from '../../helpers/appConfig';

export const ActivityListService = () => {
    const body = {
        "search":
            [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            }], "formname": "eventactivity"
    }
    return Axios.post('events/filter', body);
}