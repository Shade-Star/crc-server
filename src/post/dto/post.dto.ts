import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  thmbl_image: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsString()
  @IsNotEmpty()
  category: string;
}

// id       String @id @default(auto()) @map("_id") @db.ObjectId
// title    String
// thmbl_image String?
//   image String?
//     description String
// level String
// ingredients String[]
// category String
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// id_user String   @db.ObjectId
// user  User @relation(fields: [id_user], references: [id])
// likedPosts UserLikedPost[]
