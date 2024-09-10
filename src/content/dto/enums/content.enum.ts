import { registerEnumType } from '@nestjs/graphql';

export enum Type {
  channel = 'channel',
  movie = 'movie',
  series = 'series',
}

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

// Registro del enum 'Type' en el esquema GraphQL
registerEnumType(Type, {
  name: 'Type', // Nombre del enum en el esquema GraphQL
  description: 'Tipo de contenido disponible, puede ser un canal, una película o una serie', // Descripción del enum
});

// Registro del enum 'Status' en el esquema GraphQL
registerEnumType(Status, {
  name: 'Status', // Nombre del enum en el esquema GraphQL
  description: 'Estado del contenido, puede ser activo o inactivo', // Descripción del enum
});
