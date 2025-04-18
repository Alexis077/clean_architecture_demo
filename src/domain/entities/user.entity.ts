// Entidad de dominio pura sin dependencias externas
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
} 