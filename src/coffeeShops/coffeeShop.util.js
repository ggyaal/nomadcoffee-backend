import { uploadToS3 } from "../shared.utils";

export const splitArrData = (data, name) => {
  const splited = data.split(",");
  return splited.map((d) => ({
    where: { [name]: d.trim() },
    create: { [name]: d.trim() },
  }));
};

export const uploadArrData = async (datas, userId, dataName, name) => {
  const files = await datas.map(async (data) => {
    const photo = await data;
    return uploadToS3(photo, userId, dataName);
  });

  const urls = await Promise.all(files);

  return urls.map(d => ({
    where: { [name]: d },
    create: { [name]: d }
  }))
}