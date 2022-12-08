import { Controller } from "@nestjs/common";
import { SystemCompanyService } from "./system_company.service";

@Controller('system_company')
export class SystemCompanyController {
    constructor(private readonly systemCompanyService: SystemCompanyService) {}
}