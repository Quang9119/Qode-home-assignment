// pages/api/update-comment.js
"use server"
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { photoId, comment } = body;

        // Kiểm tra dữ liệu đầu vào
        if (!photoId) {
            return NextResponse.json({ message: "Missing photoId" }, { status: 400 });
        }

        // Cập nhật bình luận cho ảnh
        const updatedPhoto = await prisma.photo.update({
            where: { id: photoId },
            data: { comment: comment }, // Cập nhật bình luận
        });

        return NextResponse.json({ message: "Photo updated", updatedPhoto }, { status: 200 });
    } catch (error) {
        console.error("Error updating photo:", error);
        return NextResponse.json({ message: "Error updating photo in database" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Đảm bảo đóng kết nối
    }
}
