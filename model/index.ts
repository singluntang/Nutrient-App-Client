export type User = {
                    userId: string,
                    userName: string,
                    userEmail: string,
                    userPassword: string,
                    userRemark: string,
                    updCount: number,
                    createAt: string,
                  };

export type IngredientUnit = {
                    unitId: string,
                    unitName: string,
                    unitCode: string,
                    userRemark: string,
                    updCount: number,
                    createAt: string,
                  };


export type Ingredient = {
                    ingredientId: string,
                    userId: string,
                    unitId: string,
                    ingredientName: string,
                    ingredientPortion: number,
                    ingredientCalorie: number,
                    ingredientProtein: number,
                    ingredientCarbonhydrate: number,
                    ingredientSugar: number,
                    ingredientFat: number,
                    ingredientSodium: number,
                    ingredientCalcium: number,
                    ingredientCholesterol: number,
                    ingredientFibre: number,
                    ingredientSaturateFat: number,
                    ingredientTransFat: number,
                    ingredientIron: number,
                    ingredientZinc: number,
                    ingredientMagnesium: number,
                    ingredientPotasium: number,
                    ingredientRemark: string,
                    updCount: number,
                    createAt: string,
                  }; 
                  

export type Menu = {
                    menuId: string,
                    userId: string,
                    menuName: string,
                    menuRemark: string,
                    updCount: number,
                    createAt: string,
                  };

export type UserMenuIngredient = {
                    menuId: string,
                    ingredientId: string,
                    userId: string,
                    unitId: string,
                    menuPortion: number,
                    menuRemark: string,
                    updCount: number,
                    createAt: string,
                  };
