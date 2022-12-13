import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  active: boolean;
}

export class User extends DomainEntity {
  readonly lastName: string;
  readonly firstName: string;
  readonly email: string;
  readonly age: number;
  active: boolean;

  constructor(props: UserProps & EntityProps) {
    super(props);

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.age = props.age;
    this.active = props.active;
  }
}
