import { protectedResolver } from "../../users/users.utils";
import { splitArrData } from "../coffeeShop.util";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, categories, photos, latitude, longitude },
        { loggedInUser, client }
      ) => {
        let categoryObj = [];
        if (categories) {
          categoryObj = splitArrData(categories, "name");
        }
        let photosObj = [];
        if (photos) {
          photosObj = splitArrData(photos, "url");
        }
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: { id: loggedInUser.id },
            },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            ...(photosObj.length > 0 && {
              photos: {
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
