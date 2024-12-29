import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({totslAmount: 0, items: []}); 
      
    }

    const userCard = await prisma.cart.findFirst({
      where: {
        OR: [
          {token}
        ]
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              }
            },
            ingredients: true,
          }
        },
      }
    });
      return NextResponse.json(userCard);
  } catch(error) {
    console.log(error);
    
  }
  
}