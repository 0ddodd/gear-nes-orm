import { IsNumber, IsString } from "class-validator";

// 유효성 검사
// typescript의 타입 정의는 "정적 검사"임 (cat.entity.ts)
// 컴파일 시에만 작동하기 때문에 실제로 전달된 데이터가 해당 타입인지는 확인 안 함
// 유효성 검사 데코레이터는 "런타임"에서 작동하여 실시간으로 타입을 검증함
// 유효성 검사가 없으면 age에 string을 보내든 하나를 빼먹든 못 잡아냄

export class CreateCatDto {
    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsString()
    breed: string;
}