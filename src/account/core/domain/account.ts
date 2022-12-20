import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

interface UserProps extends EntityProps {
  balance: number;
}

export class Account extends DomainEntity {
  balance: number;

  constructor(props: UserProps) {
    super(props);

    this.balance = props.balance;
  }
}
