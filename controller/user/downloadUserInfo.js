import query from "../../db/index.js";
import axios from "axios";

const downloadUserInfo = async (req, res) => {
  try {
    const templateId = "d9ed224";
    const apiKey = "m-D5iMRtMqQkkLGxvPw8d";
    const apiUrl = `https://pdfgen.app/api/generate?templateId=${templateId}`;
    const id = req.params.id;
    const dbRes = await query("SELECT * FROM users WHERE id=$1", [id]);
    const requestData = dbRes.rows[0];
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=mypdf.pdf");
    console.log(response);
    res.send(response.data);
  } catch {
    (function (error) {
      // handle error
      // console.error(error);
      // console.log(JSON.stringify(error));
      if (error.response.status === 401) {
        navigate("login");
      }
    });
  }
};

export default downloadUserInfo;
