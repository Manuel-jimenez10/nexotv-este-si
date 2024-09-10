import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
}

// Registro del enum 'ValidRoles' en el esquema GraphQL
registerEnumType(ValidRoles, {
  name: 'ValidRoles', // Nombre del enum en el esquema GraphQL
  description: 'Roles de usuario válidos en el sistema, incluyendo admin, usuario y superusuario', // Descripción del enum
});
