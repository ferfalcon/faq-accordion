/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Faq` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Faq" ("answer", "createdAt", "id", "isActive", "question") SELECT "answer", "createdAt", "id", "isActive", "question" FROM "Faq";
DROP TABLE "Faq";
ALTER TABLE "new_Faq" RENAME TO "Faq";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
