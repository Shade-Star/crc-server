import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, UserModule, PostModule, IngredientModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
