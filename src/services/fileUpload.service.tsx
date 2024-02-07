import axios from "axios";

export const fileUpload = async (formData: any) => {
  try {
    const uploadResponse = await axios.post(
      "http://127.0.0.1:1810/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return uploadResponse;
  } catch (error) {
    console.error("Erro ao gerar boleto:", error);
  }
};
