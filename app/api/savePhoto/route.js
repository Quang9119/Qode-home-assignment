// pages/api/savePhoto.js
"use server"
// pages/api/savePhoto.js
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { photoUrl, comment } = body;

        // Kiểm tra dữ liệu đầu vào
        if (!photoUrl) {
            return NextResponse.json({ message: "Missing photoUrl" }, { status: 400 });
        }

        // Lưu ảnh vào cơ sở dữ liệu
        const photo = await prisma.photo.create({
            data: {
                url: photoUrl,
                comment: comment, // Lưu bình luận nếu có
            },
        });

        return NextResponse.json({ message: "Photo saved", photoId: photo.id }, { status: 200 });
    } catch (error) {
        console.error("Error saving photo:", error);
        return NextResponse.json({ message: "Error saving photo to database" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Đảm bảo đóng kết nối
    }
}

