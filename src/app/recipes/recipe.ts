import { Ingridient } from '../shared/ingridient';
export class Recipe {


  constructor(public id, public name: string, public description: string, public imagePath: string, public ingridients: Ingridient[]) {

  }
}
