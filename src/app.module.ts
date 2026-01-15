import { Module } from '@nestjs/common';
import { ItemController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './users/items.module';
// import { AssignmentsModule } from './assignments/assignments.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './users/models/itemModel';
// import { Assignment } from './assignments/models/assignmentModel';

@Module({
  imports: [
    // AuthModule,
    ItemsModule,
    // AssignmentsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: 'postgresql://neondb_owner:npg_87WQOcmeEPXl@ep-lucky-sunset-ahfhleg9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      models: [Item],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [ItemController],
  providers: [AppService],
})
export class AppModule {}
