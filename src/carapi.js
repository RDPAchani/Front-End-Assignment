export const getCars = () => {
   return  fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch" + response.statusText);

        return response.json();
      });
    };

    export const addCar = (newCar) => {
      return fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newCar)
      })
      .then((response) => {
        if (!response.ok)
        throw new Error ("Error when adding a car");
  
        return response.json();
      });
    };

   export const updateCar = (url, updatedCar) => {
     return fetch(url,{
        method:"PUT",
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(updatedCar),
      })
      .then((response) => {
        if (!response.ok)
        throw new Error("Error when updating car");
  
        return response.json();
      });
    };


    export const deleteCar = (url) => {
       return fetch(url, { method: "DELETE" })
          .then((response) => {
            if (!response.ok)
              throw new Error("Error in deletion: " + response.statusText);
  
            return response.json();
          });
        };
  

