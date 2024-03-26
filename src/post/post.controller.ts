import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from '../auth/guard';
import { PostDto } from './dto/post.dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
  @Get('/category/:id')
  getPostsByCategoryId(@Param('id') id: string) {
    return this.postService.getPostsByCategoryId(id);
  }
  @UseGuards(JwtGuard)
  @Get('/user/:id')
  getPostsByUserId(@GetUser() user: User) {
    return this.postService.getPostsByUserId(user.id);
  }
  @UseGuards(JwtGuard)
  @Post()
  createPost(@Body() createPostDto: PostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
