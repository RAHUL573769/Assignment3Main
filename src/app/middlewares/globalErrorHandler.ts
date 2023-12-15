/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import IErrorType from '../types/Terror';

const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorResponseObj: IErrorType = {
    success: false,
    message: 'Internal Server Error',
    errorMessage: 'Something Wrong Happened',
    errorDetails: error || `Can't find the errorDetails`,
    stack: error.stack || `Can't find the error stack`,
  };

  if (error.name == 'ZodError') {
    errorResponseObj.message = 'Validation Error';

    let errorMessage = '';
    error.issues.map((errorObj: any) => {
      errorMessage += `${errorObj.path} is ${errorObj.message.toLowerCase()}. `;
    });
    errorResponseObj.errorMessage = errorMessage.substr(
      0,
      errorMessage.length - 1,
    );
  }

  if (error.name == 'CastError') {
    errorResponseObj.message = 'Invalid ID';
    errorResponseObj.errorMessage = `${error?.value?._id} is not a valid ID`;
    errorResponseObj.errorDetails = {
      stringValue: error?.value?._id,
      valueType: 'string',
      king: error?.kind,
      value: error?.value?._id,
      path: error?.path,
      reason: error?.reason,
      name: error?.name,
      message: `${error?.message.toString()}`,
    };
  }
  res.status(error.statusCode || 500).json(errorResponseObj);
};

export default globalErrorHandler;
