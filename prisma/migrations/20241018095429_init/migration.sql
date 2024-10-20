-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "pw" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isLogin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guestbook" (
    "id" SERIAL NOT NULL,
    "guestName" TEXT NOT NULL,
    "pw" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guestbook_pkey" PRIMARY KEY ("id")
);
