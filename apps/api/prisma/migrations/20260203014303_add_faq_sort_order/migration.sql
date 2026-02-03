-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Faq" ("answer", "createdAt", "id", "isActive", "question", "updatedAt") SELECT "answer", "createdAt", "id", "isActive", "question", "updatedAt" FROM "Faq";
DROP TABLE "Faq";
ALTER TABLE "new_Faq" RENAME TO "Faq";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
