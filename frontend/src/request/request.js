import axios from "axios";

class BackendRequest {
    static API_LINK = import.meta.env.VITE_API_LINK;

    static async fetchOrientationItems()
    {

    }

    static async fetchTagsItems()
    {

    }

    static async fetchTagItem(id)
    {
        try
        {
            return await axios.get(`${(BackendRequest.API_LINK)}api/tag/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async fetchBachelors()
    {

    }

    static async fetchBachelor(id)
    {
        try {
            const response = await axios.get(`${BackendRequest.API_LINK}api/bachelor/${id.value}/`);
            const bachelorData = response.data;

            // Get bachelor items
            bachelorData.tagsItems = [];
            for (const tagId of bachelorData.tags) {
                const tags = await BackendRequest.fetchTagItem(tagId);
                bachelorData.tagsItems.push(tags.data);
            }

            // Get bachelor teacher name
            bachelorData.teacher = await BackendRequest.getTeacherName(bachelorData.teacher);

            return bachelorData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async fetchTeacher(id)
    {
        try
        {
            return await axios.get(`${BackendRequest.API_LINK}api/teacher/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async getTeacherName(id)
    {
        const res = await BackendRequest.fetchTeacher(id);
        return res.data.first_name + " " + res.data.last_name;
    }
}

export default BackendRequest;