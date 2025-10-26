import { IsEnum, IsNotEmpty, ValidateIf } from "class-validator";

export class QueryDTO {
    @ValidateIf(obj => !obj.file)
    @IsNotEmpty({ message: 'Erorr' })
    query: string

    @ValidateIf(obj => !obj.query)
    @IsNotEmpty({ message: 'Erorr' })
    file: File

    @ValidateIf(obj => obj.file)
    @IsEnum(['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'])
    fileType?:string
}