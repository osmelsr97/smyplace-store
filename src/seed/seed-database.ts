import { initialData } from "./seed";
import prisma from "../lib/prisma";

// async function seed() {
//   const { categories, products } = initialData;

//   // Insert all categories
//   const categoriesData = categories.map((category) => ({ name: category }));

//   const categoriesInDB = await prisma.category.createManyAndReturn({
//     data: categoriesData,
//   });
//   // const categoriesInDB = await prisma.category.findMany();

//   const categoriesMap = categoriesInDB.reduce((categoryMap, newCategory) => {
//     const { id, name } = newCategory;
//     categoryMap[name.toLowerCase()] = id;
//     return categoryMap;
//   }, {} as Record<string, string>);

//   // Insert products
//   for (const product of products) {
//     const { images, type, ...restProduct } = product;

//     const dbProduct = await prisma.product.create({
//       data: {
//         ...restProduct,
//         categoryId: categoriesMap[type] ?? "unisex",
//       },
//     });

//     // Insert images from product
//     const imagesData = images.map((image) => ({
//       url: image,
//       productId: dbProduct.id,
//     }));

//     await prisma.productImage.createMany({
//       data: imagesData,
//     });
//   }
// }

async function optimizedSeed() {
  const { products } = initialData;
  for (const product of products) {
    const { images, type: categoryName, ...restProduct } = product;

    await prisma.product.create({
      data: {
        ...restProduct,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
        ProductImage: {
          createMany: {
            data: images.map((url) => ({ url })),
          },
        },
      },
    });
  }
}

async function main() {
  /* Clean all records */
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  /*  Seed DataBase */
  // await seed();
  await optimizedSeed();

  console.log("✅ Seed executed successfully!");
}

(() => {
  main();
})();
