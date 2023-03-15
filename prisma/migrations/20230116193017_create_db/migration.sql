-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bread" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "available_for_adoption" BOOLEAN NOT NULL DEFAULT true,
    "avatar_url" TEXT NOT NULL,
    "guardian_id" TEXT NOT NULL,
    CONSTRAINT "pets_guardian_id_fkey" FOREIGN KEY ("guardian_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "adoptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adopter_id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    CONSTRAINT "adoptions_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_key" ON "pets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "adoptions_id_key" ON "adoptions"("id");
