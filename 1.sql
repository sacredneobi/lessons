SELECT "store"."id",
  "store"."caption",
  "store"."description",
  "store"."createdAt",
  "store"."updatedAt",
  "store"."deletedAt",
  "storeSettings"."id" AS "storeSettings.id",
  "storeSettings"."caption" AS "storeSettings.caption",
  "storeSettings"."description" AS "storeSettings.description",
  "storeSettings"."createdAt" AS "storeSettings.createdAt",
  "storeSettings"."updatedAt" AS "storeSettings.updatedAt",
  "storeSettings"."deletedAt" AS "storeSettings.deletedAt",
  "storeSettings"."storeId" AS "storeSettings.storeId"
FROM "stores" AS "store"
  LEFT OUTER JOIN "storeSettings" AS "storeSettings" ON "store"."id" = "storeSettings"."storeId"
  AND ("storeSettings"."deletedAt" IS NULL)
WHERE ("store"."deletedAt" IS NULL)