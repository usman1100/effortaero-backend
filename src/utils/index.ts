import { HttpStatus } from '@nestjs/common';

export const generateResponse = (
    failed: boolean,
    code: number,
    message: string,
    data: object,
) => ({
    failed,
    code,
    message,
    data,
});

export const generateInternalServerError = (e: any) => {
    const error: Error = e;
    return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
    };
};
