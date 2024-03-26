import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto } from './dto/post.dto';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany();
  }

  getPostById(id: string) {
    return this.prismaService.post.findUnique({
      where: {
        id: id,
      },
    });
  }
  getPostsByUserId(id: string) {
    return this.prismaService.post.findMany({
      where: {
        id_user: id,
      },
    });
  }
  getPostsByCategoryId(id: string) {
    return this.prismaService.post.findMany({
      where: {
        category: id,
      },
    });
  }
  createPost(createPostDto: PostDto, user: User) {
    return this.prismaService.post.create({
      data: {
        ...createPostDto,
        id_user: user.id,
      },
    });
  }

  updatePost(id: string) {
    return `Post with id ${id} updated`;
  }

  deletePost(id: string) {
    return this.prismaService.post.delete({
      where: {
        id: id,
      },
    });
  }
}
