import axios from "axios";

class BackendRequest {
    static API_LINK = import.meta.env.VITE_API_LINK;

    static async fetchAllOrientations()
    {
        try
        {
            return await axios.get(BackendRequest.API_LINK + "api/orientation/");
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async fetchAllTags()
    {
        try
        {
            return await axios.get(`${(BackendRequest.API_LINK)}api/tag/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async fetchTagById(id)
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

    static async fetchAllBachelors()
    {
        try
        {
            const res = await axios.get(`${(BackendRequest.API_LINK)}api/bachelor/`);
            return res.data.sort((a, b) => b.id - a.id);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async fetchBachelorById(id)
    {
        try {
            const response = await axios.get(`${BackendRequest.API_LINK}api/bachelor/${id}/`);
            const bachelorData = response.data;

            // Get bachelor items
            bachelorData.tagsItems = [];
            for (const tagId of bachelorData.tags) {
                const tags = await BackendRequest.fetchTagById(tagId);
                bachelorData.tagsItems.push(tags.data);
            }

            // Get bachelor teacher name
            bachelorData.teacherName = await BackendRequest.getTeacherName(bachelorData.teacher);

            return bachelorData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async fetchTeacherById(id)
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
        const res = await BackendRequest.fetchTeacherById(id);
        return res.data.first_name + " " + res.data.last_name;
    }

    static async fetchAllTeachers()
    {
        try
        {
            return await axios.get(BackendRequest.API_LINK + "api/teacher/");
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async createBachelor(data)
    {
        try
        {
            return await axios.post(BackendRequest.API_LINK + "api/bachelor/", data);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async updateBachelor(id, data)
    {
        try
        {
            return await axios.put(BackendRequest.API_LINK + "api/bachelor/" + id + "/", data);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async deleteBachelor(id)
    {
        try
        {
            return await axios.delete(`${(BackendRequest.API_LINK)}api/bachelor/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }

    }
}

export default BackendRequest;