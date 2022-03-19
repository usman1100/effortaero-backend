import { HttpStatus } from '@nestjs/common';
import { ResponseType } from 'src/types';

export const generateResponse = (
    failed: boolean,
    code: number,
    message: string,
    data: object,
): ResponseType => ({
    failed,
    code,
    message,
    data,
});

export const generateInternalServerError = (e: any): ResponseType => {
    const error: Error = e;
    return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
    };
};

export const generateAlreadyExistError = (message?: string): ResponseType => {
    return {
        failed: true,
        code: HttpStatus.CONFLICT,
        message: message || 'Already Exists',
        data: null,
    };
};

export const generateSuccessResponse = (
    data: any,
    code: number,
    message?: string,
): ResponseType => ({
    failed: false,
    code,
    message,
    data,
});
