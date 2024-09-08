import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsModule } from './metrics/metrics.module';
import { ViewHistoryModule } from './view-history/view-history.module';
import { SupportModule } from './support/support.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { StripeModule } from './stripe/stripe.module';
import { EmailModule } from './email/email.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl:
        process.env.STATE === 'prod'
          ? {
              rejectUnauthorized: false,
              sslmode: 'require',
            }
          : (false as any),
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    MetricsModule,
    ViewHistoryModule,
    SupportModule,
    SubscriptionModule,
    ContentModule,
    AuthModule,
    SeedModule,
    FilesModule,
    StripeModule,
    CloudinaryModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {
  constructor() {
    console.log('host', process.env.STATE);
    console.log('host', process.env.DB_HOST);
    console.log('port', +process.env.DB_PORT);
    console.log('username', process.env.DB_USERNAME);
    console.log('password', process.env.DB_PASSWORD);
    console.log('database', process.env.DB_NAME);
  }
}
