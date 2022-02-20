import { HttpStatus } from '@nestjs/common';

export const generateInternalServerError = (e: any) => {
    const error: Error = e;
    return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
    };
};
