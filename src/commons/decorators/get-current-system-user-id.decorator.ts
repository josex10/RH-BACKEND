import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TJwtPayload } from "../types";

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
      const request = context.switchToHttp().getRequest();
      const user = request.user as TJwtPayload;
      return user.sub;
    },
  );