import { Controller, Put, Param, Body, UseGuards,Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Put(':id/role')
  async updateUserRole(@Param('id') id: number, @Body('role') role: string) {
    return this.userService.updateUserRole(id, role);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }
}
