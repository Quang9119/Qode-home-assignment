// pages/api/getPhotos.js
"use server"
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: {
                uploadedAt: 'desc', // Sắp xếp theo thời gian tải lên
            },
        });

        return NextResponse.json(photos, { status: 200 });
    } catch (error) {
        console.error("Error fetching photos:", error);
        return NextResponse.json({ message: "Error fetching photos from database" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Đảm bảo đóng kết nối
    }
}