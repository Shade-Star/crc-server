import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from './dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.ingredientService.findOne(id);
  }
  @Post()
  create(@Body() createIngredientDto: IngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(id);
  }
}
