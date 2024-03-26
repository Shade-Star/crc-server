import { Injectable } from '@nestjs/common';
import { IngredientDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prismaService: PrismaService) {}
  create(createIngredientDto: IngredientDto) {
    return this.prismaService.ingredient.create({
      data: createIngredientDto,
    });
  }

  findAll() {
    return this.prismaService.ingredient.findMany();
  }

  findOne(id: string) {
    return this.prismaService.ingredient.findUnique({
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.prismaService.ingredient.delete({
      where: { id: id },
    });
  }
}
