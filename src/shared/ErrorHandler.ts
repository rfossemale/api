import { BaseError } from './BaseError';

const sendMailToAdminIfCritical = async () => {
  return Promise.resolve();
};
const sendEventsToSentry = async () => {
  return Promise.resolve();
};

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    console.log(err);
    // here add a Logger implementation
    await sendMailToAdminIfCritical();
    await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
