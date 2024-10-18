import { RuntimeError } from "../RuntimeError";

export class SelectedCharacterNotExistError extends RuntimeError {
    constructor(message: string) {
      super(message);
      this.name = 'SelectedCharacterNotExistError';
    }
}