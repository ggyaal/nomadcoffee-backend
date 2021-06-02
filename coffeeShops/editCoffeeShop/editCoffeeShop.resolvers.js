import { protectedResolver } from "../../users/users.utils";
import { splitArrData } from "../coffeeShop.util";

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
        if (photos) {
          categoryObj = splitArrData(categories, "name");
        }

        let photosObj = [];
        if (photos) {
          photosObj = splitArrData(photos, "url");
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
