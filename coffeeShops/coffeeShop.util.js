export const splitArrData = (data, name) => {
  const splited = data.split(",");
  return splited.map((d) => ({
    where: { [name]: d.trim() },
    create: { [name]: d.trim() },
  }));
};
