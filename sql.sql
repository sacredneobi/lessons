SELECT "id",
  "caption",
  "description",
  "article"
FROM "goods" AS "good"
WHERE ("good"."deletedAt" IS NULL)
ORDER BY "good"."id"
LIMIT 50