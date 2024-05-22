import { config } from './config'

export const getIngredientUpdateCount = (ingredientId: string, userId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/get_IngredientUpdateCount?ingredientId=${ingredientId}&userId=${userId}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                     resolve(data[0].updCount)
                  })
              }
              catch (err: unknown) {
                    if (typeof err === "string") {
                      console.log(err.toUpperCase())
                    } else if (err instanceof Error) {
                      console.log(err.message)
                    }
                }
      })
  }


  export const getMenuUpdateCount = (menuId: string) => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8)
    }

    return new Promise((resolve, reject) => {

              try {
                  fetch(`http://${config.apiAddress}:${config.apiPort}/get_MenuUpdateCount?menuId=${menuId}`, { headers })
                  .then(res => res.json())
                  .then(data => {
                     resolve(data[0].updCount)
                  })
              }
              catch (err: unknown) {
                    if (typeof err === "string") {
                      console.log(err.toUpperCase())
                    } else if (err instanceof Error) {
                      console.log(err.message)
                    }
                }
      })
  }