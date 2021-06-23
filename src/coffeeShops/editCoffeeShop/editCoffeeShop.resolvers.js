import { protectedResolver } from "../../users/users.utils";
import { splitArrData, uploadArrData } from "../coffeeShop.util";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, ongitude, photos, categories },
        { loggedInUser, client }
      ) => {
        const ok = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            photos: {
              select: { id: true },
            },
            categories: {
              select: { name: true },
            },
          },
        });
        if (!ok) return { ok: false, error: "Not found Shop." };

        let categoryObj = [];
        if (categories) {
          categoryObj = splitArrData(categories, "name");
        }

        let photosObj = [];
        if (photos) {
          photosObj = await uploadArrData(photos, loggedInUser.id, "photos", "url");
        }

        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            ongitude,
            ...(categoryObj.length > 0 && {
              categories: {
                disconnect: ok.categories,
                connectOrCreate: categoryObj,
              },
            }),
            ...(photosObj.length > 0 && {
              photos: {
                delete: ok.photos,
                connectOrCreate: photosObj,
              },
            }),
          },
        });
        return { ok: true };
      }
    ),
  },
};
