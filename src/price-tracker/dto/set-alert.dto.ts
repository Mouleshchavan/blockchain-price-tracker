import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetAlertDto {
  @IsString()
  @IsNotEmpty()
  chain: string;

  @IsNumber()
  targetPrice: number;

  @IsEmail()
  email: string;
}
