const { google } = require("googleapis");
const path = require("path");
const { Readable } = require("stream");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const KEYFILEPATH = path.join(__dirname, "../configs/ggdriveapikey.json");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  try {
    if (!Buffer.isBuffer(fileBuffer)) {
      throw new Error("The provided fileBuffer is not a valid Buffer.");
    }

    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);

    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: mimeType,
      body: bufferStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return response.data.id;
  } catch (error) {
    new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteFile = async (fileId) => {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error) {
    new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = { uploadFile, deleteFile };
