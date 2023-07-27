import axios from 'axios';

const fetchAuth = async (fetchData) => {
    const method = fetchData.method;
    const url = fetchData.url;
    const data = fetchData.data;
    const header = fetchData.header;

    try {
        let response = false;

        if (method === 'get') {
            response = await axios.get(url, header);
        } else if (method === 'post') {
            response = await axios.post(url, data, header);
        } else if (method === 'put') {
            response = await axios.put(url, data, header);
        } else if (method === 'delete') {
            response = await axios.delete(url, header);
        }

        if (response && response.data.error) {
            console.log(response.data.error);
            alert("Wrong ID or Password");
            return null;
        }

        if (!response) {
            alert("false!");
            return null;
        }

        return response;

    } catch (err) {

        if (axios.isAxiosError(err)) {
            const serverError = err;
            if (serverError && serverError.response) {
                console.log(serverError.response.data);
                alert("failed!");
                return null;
            }
        }

        console.log(err);
        alert("failed!");
        return null;
    }
};

export const GET = (url, header) => {
    return fetchAuth({ method: 'get', url, header });
};

export const POST = (url, data, header) => {
    return fetchAuth({ method: 'post', url, data, header });
};

export const PUT = (url, data, header) => {
    return fetchAuth({ method: 'put', url, data, header });
};

export const DELETE = (url, header) => {
    return fetchAuth({ method: 'delete', url, header });
};

