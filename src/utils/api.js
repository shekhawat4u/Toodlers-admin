import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    if (!apiUrl) {
      throw new Error(
        "API URL is not defined. Check your VITE_API_URL environment variable."
      );
    }

    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };

  var response;
  await axios.post(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

export const uploadImages = async (url, formData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };

  var response;
  await axios.post(apiUrl + url, formData, params).then((res) => {
    response = res;
  });
  return response;
};

export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };

  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

export const deleteImages = async (url, image) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.delete(apiUrl + url, params);
  return data;
};

export const deleteData = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.delete(apiUrl + url, params);
  return data;
};

export const deleteMultipleData = async (url, ids) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.delete(apiUrl + url, {
      ...params,
      data: { ids: ids },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || error;
  }
};
