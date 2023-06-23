import query from "../../db/index.js";
import axios from "axios";

const downloadUserInfo = async (req, res) => {
  try {
    const templateId = "d9ed224";
    const apiKey = "m-D5iMRtMqQkkLGxvPw8d";
    const apiUrl = `https://pdfgen.app/api/generate?templateId=${templateId}`;
    const id = req.params.id;
    const dbRes = await query("SELECT * FROM users WHERE id=$1", [id]);
    // const requestData = dbRes.rows[0];
    const requestData = {
      data: {
        id: 10,
        username: "notadmin",
        email: "notadmin@mail.com",
        password:
          "$2a$10$Yf5CiJKTtNGcDxQSZv3hmu24Xt15VAdhgxMNJl6pKqxJtlRHsIFH2",
        created_at: "2023-06-23T16:43:56.091Z",
        deleted_at: null,
        isadmin: false,
      },
    };

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
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    res.status(500).send("Error generating PDF");
  }
};

export default downloadUserInfo;
