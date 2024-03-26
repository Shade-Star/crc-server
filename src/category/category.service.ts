import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  create(createCategoryDto: CategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({
      where: { id: id },
    });
  }
}
