require("./config");
const express = require("express");
const controllers = require("./controller");

const app = express();

app.use(express.json());

if (Array.isArray(controllers)) {
  controllers.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}

app.listen(8989, () => {
  console.log("server listen on port: 8989");
});

// good
//   .findAll({
//     include: [
//       {
//         association: new HasOne(good, storeSetting, {
//           sourceKey: "storeId",
//           foreignKey: "storeId",
//         }),
//       },
//     ],
//   })
//   .then((rows) => {
//     console.log(
//       rows.map((item) => ({
//         goodName: item.caption,
//         currency: item.storeSetting?.caption,
//         currencyDescription: item.storeSetting?.description,
//       }))
//     );
//   });

// // const run = async () => {
// //   const storeData = await store.create({
// //     caption: "testStore",
// //     description: "default",
// //   });

// //   await storeSetting.create({
// //     caption: "$",
// //     description: "currency",
// //     storeId: storeData.id,
// //   });

// //   await good.create({
// //     caption: "good 1",
// //     description: "auto good",
// //     storeId: storeData.id,
// //   });
// //   await good.create({
// //     caption: "good 2",
// //     description: "auto good",
// //     storeId: storeData.id,
// //   });
// //   await good.create({
// //     caption: "good 3",
// //     description: "auto good",
// //     storeId: storeData.id,
// //   });
// // };

// // run();
