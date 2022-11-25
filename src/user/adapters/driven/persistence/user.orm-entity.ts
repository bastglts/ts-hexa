import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../domain/user';

@Entity({ name: 'user' })
export class UserTypeormEntity {
  @PrimaryColumn({ name: 'uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Column({ name: 'email', type: 'varchar' })
  email!: string;

  @Column({ name: 'age', type: 'int' })
  age!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  toDomain(): User {
    return new User({
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(user: User): UserTypeormEntity {
    const entity = new UserTypeormEntity();
    entity.uid = user.uid;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.email = user.email;
    entity.age = user.age;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}
